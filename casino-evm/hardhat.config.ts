import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import configEnv from './utils/env';

configEnv();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/s3OFGri7DNMiwmtKUQ9iZD-rdkV69riv`,
      accounts: ["dccf18f41d6266a08171828d31f04dea3528a58d70e3591d94367a0c8a4183a4"] 
    },
  }
};

export const contractAddress = "0x12e9701E97111Afe67c7ffD7FEEb6566fec64BCe";

export default config;
