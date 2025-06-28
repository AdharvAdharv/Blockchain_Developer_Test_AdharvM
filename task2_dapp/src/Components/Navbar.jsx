import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Navbar() {
  const [currentAccount, setCurrentAccount] = useState("");
  const menuList = [
    { name: "Home", link: "/" },
    { name: "White Paper", link: "/whitepaper" },
    { name: "Project", link: "/#campaigns" },
    { name: "About Us", link: "/aboutus" },
  ];

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting wallet:", error);
    }
  };

  const checkIfWalletConnected = async () => {
    if (!window.ethereum) return;
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log("Error checking wallet connection:", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();

    // Listen for account changes)}
    window.ethereum?.on("accountsChanged", (accounts) => {
      setCurrentAccount(accounts[0] || "");
    });

    // Listen for network changes
    window.ethereum?.on("chainChanged", () => {
      window.location.reload();
    });
  }, []);

  return (
    <div
      className="text-white w-screen h-[70px] px-6 flex items-center justify-between"
      style={{ backgroundColor: "#1a1a1a" }}
    >
     
      <div className="flex items-center space-x-4 ml-12">
        <Link to="/" className=" flex">
        <Logo />
        <p className="text-2xl font-bold mr-12">FundFlow</p>
        </Link>
        <ul className="flex items-center space-x-8">
          {menuList.map((item, i) => (
            <li key={i}>
              <a
                href={item.link}
                aria-label={item.name}
                title={item.name}
                className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-400"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Connect Button */}
      {!currentAccount && (
        <button
          onClick={connectWallet}
          className="h-10 mr-[100px] px-5 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-600 hover:bg-purple-700 focus:outline-none"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default Navbar;
