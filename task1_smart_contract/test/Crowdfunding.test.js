const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crowdfunding Contract", function () {
  let crowdfunding;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    [owner, addr1, addr2] = await ethers.getSigners();
    crowdfunding = await Crowdfunding.deploy();
    await crowdfunding.waitForDeployment();
  });

  it("should create a campaign successfully", async function () {
    const tx = await crowdfunding.createCampaign(
      "Save Earth",
      "Plant trees worldwide",
      ethers.parseEther("1"),
      Math.floor(Date.now() / 1000) + 86400
    );

    await tx.wait();

    const campaigns = await crowdfunding.getAllCampaigns();
    expect(campaigns.length).to.equal(1);
    expect(campaigns[0].title).to.equal("Save Earth");
  });

  it("should accept donations and track donators", async function () {
    await crowdfunding.createCampaign(
      "Save Forest",
      "Protect wildlife",
      ethers.parseEther("1"),
      Math.floor(Date.now() / 1000) + 86400
    );

    await crowdfunding.connect(addr1).donateToCampaign(0, {
      value: ethers.parseEther("0.5"),
    });

    await crowdfunding.connect(addr2).donateToCampaign(0, {
      value: ethers.parseEther("0.3"),
    });

    const [donators, donations] = await crowdfunding.getDonators(0);
    expect(donators.length).to.equal(2);
    expect(donations.length).to.equal(2);
    expect(donations[0]).to.equal(ethers.parseEther("0.5"));
    expect(donations[1]).to.equal(ethers.parseEther("0.3"));

    const campaigns = await crowdfunding.getAllCampaigns();
    expect(campaigns[0].amountCollected).to.equal(ethers.parseEther("0.8"));
  });

  it("should allow refund claim if target not met after deadline", async function () {
    await crowdfunding.createCampaign(
      "Failing Campaign",
      "This won't hit target",
      ethers.parseEther("2"),
      Math.floor(Date.now() / 1000) + 86400 // 1 day from now
    );

    await crowdfunding.connect(addr1).donateToCampaign(0, {
      value: ethers.parseEther("0.5"),
    });

    // ⏩ Fast-forward 2 days
    await ethers.provider.send("evm_increaseTime", [2 * 86400]);
    await ethers.provider.send("evm_mine", []);

    const beforeBalance = await ethers.provider.getBalance(addr1.address);

    const tx = await crowdfunding.connect(addr1).claimRefund(0);
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed * receipt.gasPrice;

    const afterBalance = await ethers.provider.getBalance(addr1.address);

    expect(afterBalance).to.be.greaterThan(beforeBalance - gasUsed);
  });
});
