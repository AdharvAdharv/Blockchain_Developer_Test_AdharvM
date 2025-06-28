import React, { useContext, useEffect, useState } from "react";
import heroBg from "../Images/bg-image.jpeg";
import CampaignForm from "./CampaignForm";
import CampaignCard from "./CampaignCard";
import { CrowdFundingContext } from "../Context/Crowdfunding";
import PopUp from "./PopUp";

function HomePage() {
  const { getCampaigns, getUserCampaigns, donate, getDonations } =
    useContext(CrowdFundingContext);
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  
  

  const fetchCampaigns = async () => {
    const campaigns = await getCampaigns();
    setAllCampaigns(campaigns);
  };

  const fetchUserCampaigns = async () => {
    const campaigns = await getUserCampaigns();
   
    
    setUserCampaigns(campaigns);
  };
  useEffect(() => {
    fetchUserCampaigns();
    fetchCampaigns();
  }, [getCampaigns]);
  return (
    <div>
      <div
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-6">
          {/* Left Section */}
          <div className="text-white max-w-xl space-y-6">
            <h1 className="text-5xl font-bold">Fund Flow</h1>
            <p className="text-lg">
              Create and fund amazing projects with cryptocurrency. Join our
              decentralized crowdfunding platform today!
            </p>
          </div>

          <CampaignForm />
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="max-w-6xl mx-auto p-6" id="campaigns">
        <h2 className="text-3xl font-semibold mb-6">All Campaigns</h2>
        <CampaignCard 
        title="Active Campaigns"
        campaigns={allCampaigns} 
        donate={donate} 
        getDonations={getDonations}/>

        <CampaignCard
          title="Your Created Campaigns"
          campaigns={userCampaigns}
          donate={donate}
          getDonations={getDonations}
        />

        {openModel && (
          <PopUp
            setOpenModel={setOpenModel}
            donate={donateCampaign}
            getDonations={getDonations}
            donateFunction={donateCampaign}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
