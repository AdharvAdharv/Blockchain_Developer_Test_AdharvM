import React, { useContext, useState } from "react";
import { CrowdFundingContext } from "../Context/Crowdfunding";

function CampaignForm() {
  const { createCampaign } = useContext(CrowdFundingContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await createCampaign(form);
    if (success) {
      alert("Campaign Created Successfully!");
      
      setForm   ({
        title: "",
        description: "",
        amount: "",
        deadline: "",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mt-10 md:mt-0">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border border-gray-300 p-3 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border border-gray-300 p-3 rounded"
        />
        <input
          type="text"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Target Amount (ETH)"
          className="w-full border border-gray-300 p-3 rounded"
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded font-semibold hover:bg-indigo-700"
        >
          Create Campaign
        </button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Create your campaign to raise funds
      </p>
    </div>
  );
}

export default CampaignForm;
