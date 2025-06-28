const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign");

router.post("/campaigns", async (req, res) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }
  
    try {
     
      const lastCampaign = await Campaign.findOne().sort({ campaignId: -1 });
      const newCampaignId = lastCampaign ? parseInt(lastCampaign.campaignId) + 1 : 0;
  
      
      const campaign = new Campaign({
        campaignId: newCampaignId,
        title,
        description,
      });
  
      await campaign.save();
      
      console.log("Camapaign Added Successfully")
      res.status(201).json({message: "Campaign Added Successfully",campaign: campaign});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/campaigns", async (req, res) => {
    try {
      const campaigns = await Campaign.find();
  
      if (campaigns.length === 0) {
        return res.status(404).json({ message: "No campaigns found" });
      }
  
      res.json(campaigns);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
