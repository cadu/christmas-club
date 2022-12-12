import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const christmasClubFactory = await ethers.getContractFactory("ChristmasClub");
  const christmasClubContract = await christmasClubFactory.deploy(unlockTime);

  await christmasClubContract.deployed();

  console.log(
    `Christmas Club Contract deployed to ${christmasClubContract.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
