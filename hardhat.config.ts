import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  paths: { tests: "tests", artifacts: "./src/artifacts" },
  networks: {
    goerli: {
      url: process.env.PROVIDER_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};

export default config;
