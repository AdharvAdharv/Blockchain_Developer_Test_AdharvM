import React, { useState, useEffect, useContext } from "react";
import { CrowdFundingContext } from "../Context/Crowdfunding";

const PopUp = ({ setOpenModel, donate, getDonations, donateFunction }) => {
  const [amount, setAmount] = useState("");
  const [allDonationData, setAllDonationData] = useState([]);
  const [isDonating, setIsDonating] = useState(false);
  const [error, setError] = useState("");
  const { isLoading } = useContext(CrowdFundingContext);

  const createDonation = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setIsDonating(true);
    setError("");

    try {
      await donateFunction(donate.pId, amount);
      const updatedDonations = await getDonations(donate.pId);
      setAllDonationData(updatedDonations);
      setAmount("");
      alert("Donation successful!");
    } catch (err) {
      console.error("Donation error:", err);
      setError(err.message || "Failed to process donation");
    } finally {
      setIsDonating(false);
    }
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const donations = await getDonations(donate.pId);
        setAllDonationData(donations);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Failed to load donations");
      }
    };

    if (donate) {
      fetchDonations();
    }
  }, [donate.pId, getDonations]);

  const formatAddress = (address) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  const daysLeft = (deadline) => {
    const remaining = (deadline * 1000 - Date.now()) / (1000 * 3600 * 24);
    return remaining > 0 ? Math.floor(remaining) : 0;
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          <div className="bg-white rounded-lg shadow-lg flex flex-col w-full">
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b">
              <div>
                <h3 className="text-3xl font-semibold">{donate.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Created by {formatAddress(donate.owner)}
                </p>
              </div>
              <button
                className="text-black text-2xl font-bold"
                onClick={() => setOpenModel(false)}
                disabled={isDonating}
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">
                Days Left: {daysLeft(donate.deadline)}
              </p>

              <div className="w-full bg-gray-200 h-2 rounded mb-2">
                <div
                  className="bg-green-600 h-2 rounded"
                  style={{
                    width: `${Math.min(
                      (Number(donate.amountCollected) / Number(donate.target)) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>

              <p className="text-sm text-gray-700 mb-4">
                Progress: {donate.amountCollected} / {donate.target} ETH
              </p>

              <p className="text-lg text-slate-600 mb-4">{donate.description}</p>

              {/* Donation Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount (ETH)
                </label>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.0"
                  className="w-full h-12 px-4 border rounded focus:ring-emerald-500 focus:outline-none"
                  disabled={isDonating}
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              {/* Recent Donations */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Recent Donations</h4>
                {isLoading ? (
                  <div className="animate-pulse space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-8 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                ) : allDonationData.length > 0 ? (
                  <div className="space-y-2">
                    {allDonationData.map((d, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">{formatAddress(d.donator)}</span>
                        <span className="font-medium text-emerald-600">
                          {d.donation} ETH
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No donations yet</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end p-6 border-t">
              <button
                className="text-red-500 font-bold uppercase px-6 py-2 text-sm mr-2"
                onClick={() => setOpenModel(false)}
                disabled={isDonating}
              >
                Close
              </button>
              <button
                className={`font-bold uppercase text-sm px-6 py-2 rounded text-white ${
                  isDonating ? "bg-emerald-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
                onClick={createDonation}
                disabled={isDonating}
              >
                {isDonating ? "Processing..." : "Donate"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background overlay */}
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
};

export default PopUp;
