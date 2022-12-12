import { time } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { ChristmasClub, ChristmasClub__factory } from "../typechain-types";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Christmas Club", function () {  

  describe("Deployment - start unlock time in past", function () {
    let accounts: SignerWithAddress[];
    let christmasClubContract: ChristmasClub;
    let unlockStartTimeSeconds: Number;

    it("Should fail if the unlockTime is not in the future", async function () {
      // We don't use the beforeEach here because we want a different deployment
      accounts = await ethers.getSigners();
      const unlockStartTime : Date = new Date("2022-12-01"); //YYYY-MM-DD
      //getSeconds() returns 0. //getTime() is milliseconds since 01/01/1970,
      //  divide by 1000 to get seconds
      const unlockStartTimeSeconds = (unlockStartTime.getTime() / 1000);
      const unlockStartTimeSecondsBN = ethers.BigNumber.from(unlockStartTimeSeconds);
      const christmasClubFactory = new ChristmasClub__factory(accounts[0]);
      await expect(christmasClubFactory.deploy(unlockStartTimeSecondsBN), "")
        .to.be.revertedWith(
          "Unlock start time should be in the future"
      );
    });
  });

  describe("Deployment - future", function () {

    let accounts: SignerWithAddress[];
    let christmasClubContract: ChristmasClub;
    let unlockStartTimeSeconds: Number;

    beforeEach(async () => {
      accounts = await ethers.getSigners();
      const unlockStartTime : Date = new Date("2023-12-01"); //YYYY-MM-DD
      //getSeconds() returns 0. //getTime() is milliseconds since 01/01/1970,
      //  divide by 1000 to get seconds
      unlockStartTimeSeconds = (unlockStartTime.getTime() / 1000);
      const unlockStartTimeSecondsBN = ethers.BigNumber.from(unlockStartTimeSeconds);
      const christmasClubFactory = new ChristmasClub__factory(accounts[0]);
      christmasClubContract = await christmasClubFactory.deploy(unlockStartTimeSecondsBN);
      await christmasClubContract.deployed();
    });
    it("Should set the right unlockTime", async function () {
      const contractUnlockStartTimeBN = await christmasClubContract.unlockStartTime();
      const contractUnlockStartTime = ethers.BigNumber.from(contractUnlockStartTimeBN);
      expect(contractUnlockStartTime, `Contract unlock start time was 
        ${contractUnlockStartTime} but expected ${unlockStartTimeSeconds}`
      ).to.equal(unlockStartTimeSeconds);
    });

    it("Should set the right owner", async function () {
      expect(await christmasClubContract.owner()).to.equal(accounts[0].address);
    });
  });
  /*
  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);

        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Shouldn't fail if the unlockStartTime has arrived and the depositor calls it", async function () {
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });
  });*/
});
