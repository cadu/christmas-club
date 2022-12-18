import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const THREE_MINUTES_IN_SECS = 60 * 3;
  const ONE_HOUR_IN_SECS = 3600;
  //fast unlock for testing withdraw
  const unlockTime = currentTimestampInSeconds + THREE_MINUTES_IN_SECS;
  //normal unlock
  //const unlockTime = currentTimestampInSeconds + ONE_HOUR_IN_SECS;

  const christmasCCTokenFactory = await ethers.getContractFactory(
    "ChristmasClubToken"
  );
  const ccTokenContract = await christmasCCTokenFactory.deploy();
  console.log(
    `Christmas Club Token Contract deployed to ${ccTokenContract.address}`
  );

  const dateTimeFactory  = await ethers.getContractFactory("DateTime");
  const dateTimeContract = await dateTimeFactory.deploy();
  await dateTimeContract.deployed();
  console.log(
    `Date Time Contract deployed to ${dateTimeContract.address}`
  );

  const christmasClubFactory = await ethers.getContractFactory("ChristmasClub");
  const christmasClubContract = await christmasClubFactory.deploy(
    unlockTime,
    ccTokenContract.address,
    dateTimeContract.address
  );

  await christmasClubContract.deployed();
  
  const contractUnlockStartTimeBN =
    await christmasClubContract.unlockStartTime();
  const contractUnlockStartTime = ethers.BigNumber.from(
    contractUnlockStartTimeBN
  );
  console.log(`Unlock start time is ${contractUnlockStartTime}`);

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
