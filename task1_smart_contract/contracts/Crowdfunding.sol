// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Crowdfunding is Ownable {
     constructor() Ownable(msg.sender) {}
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns;

    event CampaignCreated(uint256 id, address indexed owner, string title, uint256 target, uint256 deadline);
    event DonationReceived(uint256 indexed id, address indexed donator, uint256 amount);
    event FundsWithdrawn(uint256 indexed id, uint256 amount);
    event RefundIssued(uint256 indexed id, address indexed donator, uint256 amount);

    function createCampaign(string memory _title, string memory _description, uint256 _target, uint256 _deadline)
        public
        returns (uint256)
    {
        require(_deadline > block.timestamp, "Deadline must be in future");

        Campaign storage newCampaign = campaigns[numberOfCampaigns];
        newCampaign.owner = msg.sender;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;

        emit CampaignCreated(numberOfCampaigns, msg.sender, _title, _target, _deadline);

        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp < campaign.deadline, "Campaign expired");

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;

        emit DonationReceived(_id, msg.sender, msg.value);
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }

    function withdrawFunds(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == campaign.owner, "Only creator");
        require(block.timestamp > campaign.deadline, "Too early");
        require(campaign.amountCollected >= campaign.target, "Goal not met");

        uint256 amount = campaign.amountCollected;
        campaign.amountCollected = 0;
        payable(campaign.owner).transfer(amount);

        emit FundsWithdrawn(_id, amount);
    }

    function claimRefund(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp > campaign.deadline, "Too early");
        require(campaign.amountCollected < campaign.target, "Goal met, no refunds");

        uint256 refundAmount = 0;
        for (uint256 i = 0; i < campaign.donators.length; i++) {
            if (campaign.donators[i] == msg.sender) {
                refundAmount += campaign.donations[i];
                campaign.donations[i] = 0;
            }
        }
        require(refundAmount > 0, "No funds to refund");
        payable(msg.sender).transfer(refundAmount);

        emit RefundIssued(_id, msg.sender, refundAmount);
    }
}
