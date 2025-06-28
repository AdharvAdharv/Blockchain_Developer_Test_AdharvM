const { expect } = require("chai");
const hre = require("hardhat");
const ethers = hre.ethers;

describe("Crowdfunding Before Optimization", function () {
  let Crowdfunding, crowdfunding, owner, donor;

  beforeEach(async () => {
    [owner, donor] = await ethers.getSigners();
    Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    crowdfunding = await Crowdfunding.deploy();
    await crowdfunding.deployed();
  });

  it("should create a campaign", async () => {
    await crowdfunding.createCampaign(
      "Test Campaign",
      "Test Description",
      ethers.utils.parseEther("1"),
      Math.floor(Date.now() / 1000) + 1000
    );
    const campaigns = await crowdfunding.getAllCampaigns();
    expect(campaigns.length).to.equal(1);
  });

  it("should allow a donation", async () => {
    await crowdfunding.createCampaign(
      "Test Campaign",
      "Test Description",
      ethers.utils.parseEther("1"),
      Math.floor(Date.now() / 1000) + 1000
    );
    await crowdfunding.connect(donor).donateToCampaign(0, {
      value: ethers.utils.parseEther("0.1"),
    });
    const campaign = await crowdfunding.getAllCampaigns();
    expect(campaign[0].amountCollected).to.equal(ethers.utils.parseEther("0.1"));
  });
});
