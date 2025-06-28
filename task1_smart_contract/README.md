# 📊 Crowdfunding Smart Contract
A decentralized crowdfunding platform built on Solidity, allowing users to create campaigns, donate ETH, and manage campaign outcomes on-chain. This project mirrors functionalities similar to FundFlow, featuring campaign management, donations, withdrawals, and refund logic.

## 📜 Contract Overview
Features:

Campaign creators can launch new campaigns with a funding target and deadline.

Users can donate ETH to active campaigns.

If the target is met after the deadline, campaign creators can withdraw funds.

If the target isn't met by the deadline, donors can claim refunds.

Events are emitted for campaign creation, donations, withdrawals, and refunds.

Uses OpenZeppelin Ownable for access control and contract ownership.

## 📝 Contract Details
Contract Name: Crowdfunding
Solidity Version: ^0.8.20
Libraries:

@openzeppelin/contracts (Ownable)

Key Functions:

createCampaign()

donateToCampaign()

withdrawFunds()

claimRefund()

getDonators()

getAllCampaigns()

## 📦 Project Setup

### 1️⃣ Install dependencies:
```bash

npm install
```
### 2️⃣ Install OpenZeppelin contracts:

```bash

npm install @openzeppelin/contracts
```
### 🔐 Environment Variables

Create a .env file in your root directory:

SEPOLIA_RPC_URL=<your-sepolia-rpc-url>
PRIVATE_KEY=<your-wallet-private-key>


### 🛠️ Compile Contracts
``` bash

npx hardhat compile
```

### ✅ Run Tests
Test cases cover:

Successful campaign creation

ETH donations and tracking

Refund after missed goal & deadline

Withdrawal after goal achieved

Run:

```bash

npx hardhat test
```

### 🚀 Deployment (Sepolia Testnet)
Deploy the contract using:

```bash

npx hardhat run scripts/deploy.js --network sepolia
```

Deployed Address:
0x4bAA7c3315d0e8507c7D49e590209ef7D9dE93dd



