require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "./gas_reports/gas_report.txt",
    noColors: true,
  },
};
