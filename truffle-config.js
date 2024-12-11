const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const { MNEMONIC, ALCHEMY_SEPOLIA_URL } = process.env;

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, ALCHEMY_SEPOLIA_URL),
      network_id: 11155111,  // Sepolia network ID
      gas: 3000000,
      gasPrice: 10000000000, // 10 Gwei
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",
    }
  }
};
