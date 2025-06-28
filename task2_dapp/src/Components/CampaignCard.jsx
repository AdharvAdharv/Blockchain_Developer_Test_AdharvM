import React, { useState } from "react";

function CampaignCard({ campaigns = [], title, donate, getDonations }) {
  const [donationAmounts, setDonationAmounts] = useState({});
  const [visibleDonations, setVisibleDonations] = useState({});
  const [loadingDonations, setLoadingDonations] = useState({});

  const handleAmountChange = (pId, value) => {
    setDonationAmounts((prev) => ({
      ...prev,
      [pId]: value,
    }));
  };

  const handleDonateClick = (campaign) => {
    const amount = donationAmounts[campaign.pId] || "0";
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount to donate.");
      return;
    }
    donate(campaign.pId, amount);
  };

  const handleViewDonationsClick = async (campaign) => {
    const pId = campaign.pId;

    // If donations already visible, hide them
    if (visibleDonations[pId]) {
      setVisibleDonations((prev) => {
        const copy = { ...prev };
        delete copy[pId];
        return copy;
      });
      return;
    }

    // Otherwise, fetch donations and show
    setLoadingDonations((prev) => ({ ...prev, [pId]: true }));
    try {
      const donations = await getDonations(pId); // assume this returns an array of { donator, donation }
      console.log("Raw donations:", donations);
      setVisibleDonations((prev) => ({
        ...prev,
        [pId]: donations,
      }));
    } catch (error) {
      alert("Failed to load donations");
    } finally {
      setLoadingDonations((prev) => ({ ...prev, [pId]: false }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-16 text-white">
      <h2 className="text-2xl text-black font-bold mb-6">{title}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {campaigns?.length === 0 ? (
          <p className="text-gray-400">No campaigns found.</p>
        ) : (
          campaigns.map((campaign, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">
                {campaign?.title || "Untitled Campaign"}
              </h3>
              <p className="mb-2">{campaign?.description}</p>
              <p className="mb-1">Target: {campaign?.target} ETH</p>
              <p className="mb-1">Collected: {campaign?.amountCollected} ETH</p>
              <p className="mb-2 text-sm">
                Deadline:{" "}
                {campaign?.deadline
                  ? new Date(campaign.deadline * 1000).toLocaleDateString()
                  : "N/A"}
              </p>
              {donate && (
                <>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Amount in ETH"
                    className="w-full text-white px-3 py-2 bg-gray-800 border border-teal-500 focus:ring-2 focus:ring-teal-400 focus:outline-none rounded mb-2 placeholder-gray-400"
                    value={donationAmounts[campaign.pId] || ""}
                    onChange={(e) =>
                      handleAmountChange(campaign.pId, e.target.value)
                    }
                  />
                  <button
                    onClick={() => handleDonateClick(campaign)}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded"
                  >
                    Donate
                  </button>
                </>
              )}
              <button
                onClick={() => handleViewDonationsClick(campaign)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mt-2 rounded"
              >
                {visibleDonations[campaign.pId]
                  ? "Hide Donations"
                  : "View Donations"}
              </button>

              {/* Show donations list if visible */}
              {loadingDonations[campaign.pId] && (
                <p className="mt-2 text-gray-400">Loading donations...</p>
              )}
              {visibleDonations[campaign.pId] && (
                <ul className="mt-2 max-h-40 overflow-auto text-sm text-gray-300">
                  {visibleDonations[campaign.pId].length === 0 ? (
                    <li>No donations yet.</li>
                  ) : (
                    visibleDonations[campaign.pId].map(
                      ({ donator, donation }, idx) => (
                        <li key={idx} className="border-b border-gray-700 py-1">
                          <span className="font-mono"><span className="font-bold">Donator:</span> {donator}</span>
                          <span className="font-bold "> Donated :</span>{" "}
                          <strong>{donation} ETH</strong>
                        </li>
                      )
                    )
                  )}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CampaignCard;
