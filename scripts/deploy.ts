import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const christmasClubFactory = await ethers.getContractFactory("ChristmasClub");
  const christmasClubContract = await christmasClubFactory.deploy(unlockTime);

  await christmasClubContract.deployed();

  /*
  const contractsDir = path.join(__dirname, "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");

  const abiTs = `export const abi = ${JSON.stringify(
    ContractArtifact.abi,
    null,
    2
  )} as const`;

  fs.writeFileSync(path.join(contractsDir, "abi.ts"), abiTs);
    */
  console.log(
    `Christmas Club Contract deployed to ${christmasClubContract.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
