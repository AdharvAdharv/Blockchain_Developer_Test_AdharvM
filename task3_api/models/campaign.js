const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  campaignId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Campaign", campaignSchema);
