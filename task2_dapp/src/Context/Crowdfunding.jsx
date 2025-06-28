import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import {
  BrowserProvider,
  Contract,
  parseUnits,
  formatEther,
  JsonRpcProvider,
} from "ethers";

//INTERNAL IMPORTS
import { CrowdFundingABI, CrowdFundingAddress } from "../Constans";

//FECTHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
  const titleData = "Crowd Funding Contract";
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [network, setNetwork] = useState("");

  // Initialize provider with a default RPC URL
  const getProvider = () => {
    try {
      if (window.ethereum) {
        return new BrowserProvider(window.ethereum);
      }
      return new JsonRpcProvider(
        process.env.VITE_SEPOLIA_RPC_URL ||
          "https://eth-sepolia.g.alchemy.com/v2/demo"
      );
    } catch (error) {
      console.error("Error initializing provider:", error);
      throw new Error("Failed to initialize provider");
    }
  };

  const createCampaign = async (campaign) => {
    const { title, description, amount, deadline } = campaign;
    setIsLoading(true);
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      // Convert deadline to Unix timestamp
      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

      const transaction = await contract.createCampaign(
        currentAccount,
        title,
        description,
        parseUnits(amount, 18),
        deadlineTimestamp
      );

      // Wait for transaction confirmation
      const receipt = await transaction.wait();

      if (receipt.status === 1) {
        // Transaction successful
        return true;
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error("Contract call failure:", error);
      setError(error.message || "Failed to create campaign");
      setOpenError(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getCampaigns = async () => {
    setIsLoading(true);
    try {
      const provider = getProvider();
      const contract = fetchContract(provider);
      const campaigns = await contract.getCampaigns();
      console.log("Campaigns", campaigns)

      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: formatEther(campaign.target),
        deadline: Number(campaign.deadline),
        amountCollected: formatEther(campaign.amountCollected),
        pId: i,
      }));

      return parsedCampaigns;
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setError(error.message || "Failed to fetch campaigns");
      setOpenError(true);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  const getUserCampaigns = async () => {
    try {
      const provider = getProvider();
      const contract = fetchContract(provider);

      const allCampaigns = await contract.getCampaigns();

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentUser = accounts[0];

      const campaignsArray = Array.from(allCampaigns);

      const filteredCampaigns = campaignsArray.filter(
        (campaign) => campaign[0].toLowerCase() === currentUser.toLowerCase()
      );
     

      const userData = filteredCampaigns.map((campaign, i) => ({
        owner: campaign[0],
        title: campaign[1],
        description: campaign[2],
        target: formatEther(campaign[3].toString()),
        deadline: Number(campaign[4]),
        amountCollected: formatEther(campaign[5].toString()),
        pId: i,
      }));

      return userData;
    } catch (error) {
      console.log("Error fetching user campaigns:", error);
      setError(error.message);
      setOpenError(true);
      return [];
    }
  };

  const donate = async (pId, amount) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      const campaignData = await contract.donateToCampaign(pId, {
        value: parseUnits(amount, 18),
      });
      await campaignData.wait();
      location.reload();
      return campaignData;
    } catch (error) {
      console.log("Error donating:", error);  
      setError(error.message);
      setOpenError(true);
    }
  };

  const getDonations = async (pId) => {
    try {
      const provider = getProvider();
      const contract = fetchContract(provider);

      const donations = await contract.getDonators(pId);
      const numberOfDonations = donations[0].length;

      const parsedDonations = [];
      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: formatEther(donations[1][i]),
        });
      }
      return parsedDonations;
    } catch (error) {
      console.log("Error fetching donations:", error);
      setError(error.message);
      setOpenError(true);
      return [];
    }
  };

  //CHECK IF WALLET IS CONNECTED
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        setError("Please install MetaMask");
        setOpenError(true);
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // Listen for account changes
        window.ethereum.on("accountsChanged", (newAccounts) => {
          setCurrentAccount(newAccounts[0]);
        });
        // Listen for chain changes
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
      } else {
        console.log("No Account Found");
      }
    } catch (error) {
      console.log("Error connecting to wallet:", error);
      setError(error.message);
      setOpenError(true);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
    // Cleanup listeners on unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  //CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError("Please install MetaMask");
        setOpenError(true);
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to wallet:", error);
      setError(error.message);
      setOpenError(true);
    }
  };

  return (
    <CrowdFundingContext.Provider
      value={{
        titleData,
        currentAccount,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        connectWallet,
        error,
        openError,
        setOpenError,
        isLoading,
        network,
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};
