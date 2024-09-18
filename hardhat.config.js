require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    mainnet: {
      url: process.env.ALCHAMY_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY]
    }
  }
};
