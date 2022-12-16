import { time } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { ChristmasClub, ChristmasClubToken, ChristmasClubToken__factory, ChristmasClub__factory } from "../typechain-types";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { fail } from "assert";

describe("Christmas Club", function () {  
  
  const DEPOSIT_AMOUNT : BigNumber = ethers.utils.parseUnits("20", 6);
  
  const MINT_AMOUNT : BigNumber = ethers.utils.parseUnits("2000", 6);

  describe("Deployment - start unlock time in past", function () {
    let accounts: SignerWithAddress[];
    let christmasClubContract: ChristmasClub;
    let unlockStartTimeSeconds: number;

    it("Should fail if the unlockTime is not in the future", async function () {
      // We don't use the beforeEach here because we want a different deployment
      accounts = await ethers.getSigners();

      const christmasCCTokenFactory = new ChristmasClubToken__factory(accounts[0]);
      const cCTokenContract = await christmasCCTokenFactory.deploy();

      const unlockStartTime : Date = new Date("2022-12-01"); //YYYY-MM-DD
      //getSeconds() returns 0. //getTime() is milliseconds since 01/01/1970,
      //  divide by 1000 to get seconds
      const unlockStartTimeSeconds = (unlockStartTime.getTime() / 1000);
      const unlockStartTimeSecondsBN = ethers.BigNumber.from(unlockStartTimeSeconds);
      const christmasClubFactory = new ChristmasClub__factory(accounts[0]);
      await expect(christmasClubFactory.deploy(
        unlockStartTimeSecondsBN,
        cCTokenContract.address
      ), "")
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

      const christmasCCTokenFactory = new ChristmasClubToken__factory(accounts[0]);
      const cCTokenContract = await christmasCCTokenFactory.deploy();

      const unlockStartTime : Date = new Date("2023-12-01"); //YYYY-MM-DD
      //getSeconds() returns 0. //getTime() is milliseconds since 01/01/1970,
      //  divide by 1000 to get seconds
      unlockStartTimeSeconds = (unlockStartTime.getTime() / 1000);
      const unlockStartTimeSecondsBN = ethers.BigNumber.from(unlockStartTimeSeconds);
      const christmasClubFactory = new ChristmasClub__factory(accounts[0]);
      christmasClubContract = await christmasClubFactory.deploy(
        unlockStartTimeSecondsBN,
        cCTokenContract.address
      );
      await christmasClubContract.deployed();
    });
    it("Should set the right unlockTime", async function () {
      const contractUnlockStartTimeBN = await christmasClubContract.unlockStartTime();
      const contractUnlockStartTime = ethers.BigNumber.from(contractUnlockStartTimeBN);
      expect(contractUnlockStartTime, `Contract unlock start time was 
        ${contractUnlockStartTime} but expected ${unlockStartTimeSeconds}`
      ).to.equal(unlockStartTimeSeconds);
    });
    /* //no public owner atm
    it("Should set the right owner", async function () {
      expect(await christmasClubContract.owner()).to.equal(accounts[0].address);
    });*/
  });
  
  describe("Contract totals", function() {

    let accounts: SignerWithAddress[];
    let christmasClubContract: ChristmasClub;
    let cCTokenContract: ChristmasClubToken;
    let unlockStartTimeSeconds: Number;

    beforeEach(async () => {
      accounts = await ethers.getSigners();
      const unlockStartTime : Date = new Date("2023-12-01"); //YYYY-MM-DD

      const christmasCCTokenFactory = new ChristmasClubToken__factory(accounts[0]);
      cCTokenContract = await christmasCCTokenFactory.deploy();
      console.log(`Christmas Club Token Contract deployed to ${cCTokenContract.address}`);
      //mint some money to transfer from, so we can test deposits
      const mintTx = await cCTokenContract.mint(cCTokenContract.address, MINT_AMOUNT);
      console.log(`mintTx is ${mintTx.hash}`);

      //getSeconds() returns 0. //getTime() is milliseconds since 01/01/1970,
      //  divide by 1000 to get seconds
      unlockStartTimeSeconds = (unlockStartTime.getTime() / 1000);
      const unlockStartTimeSecondsBN = ethers.BigNumber.from(unlockStartTimeSeconds);
      const christmasClubFactory = new ChristmasClub__factory(accounts[0]);
      christmasClubContract = await christmasClubFactory.deploy(
        unlockStartTimeSecondsBN,
        cCTokenContract.address
      );
      await christmasClubContract.deployed();
      console.log(`Christmas Club Contract deployed to ${christmasClubContract.address}`);
    });

    it("Should show the correct number of total savers", async function() {
      const EXPECTED_INITIAL_SAVER_COUNT = 0;
      const numSaversBN = await christmasClubContract.numberOfSavers();
      //each saver is 1 unit, no decimals
      const numSavers = parseFloat(ethers.utils.formatUnits(numSaversBN, 1)); //ethers.BigNumber.from(numSaversBN);
      expect(numSavers, `Contract number of savers was ${numSavers} 
        but expected ${EXPECTED_INITIAL_SAVER_COUNT}`
      ).to.equal(EXPECTED_INITIAL_SAVER_COUNT);
    });

    it("Should show the total goal amount set", async function() {
      const EXPECTED_INITIAL_GOAL_AMT = 0;
      const totalGoalAmountBN = await christmasClubContract.totalGoalAmount();
      //USDC has 6 decimal places
      const totalGoalAmount = parseFloat(ethers.utils.formatUnits(totalGoalAmountBN, 6)); //ethers.BigNumber.from(totalGoalAmountBN);
      expect(totalGoalAmount, `Contract goal total was ${totalGoalAmount} 
        but expected ${EXPECTED_INITIAL_GOAL_AMT}`
      ).to.equal(EXPECTED_INITIAL_GOAL_AMT);
    });

    it("Should show the total amount saved 0 at start", async function() {
      const EXPECTED_INITIAL_SAVINGS_AMT = 0;
      const totalAmountSavedBN = await christmasClubContract.totalAmountSaved();
      //USDC has 6 decimal places
      const totalAmountSaved = parseFloat(ethers.utils.formatUnits(totalAmountSavedBN, 6)); //ethers.BigNumber.from(totalGoalAmountBN);
      expect(totalAmountSaved, `Contract number of savers was ${totalAmountSaved} 
        but expected ${EXPECTED_INITIAL_SAVINGS_AMT}`
      ).to.equal(EXPECTED_INITIAL_SAVINGS_AMT);
    });
    /*
    it("Should show the total amount saved cumulatively deposited", async function() {
      //make a deposit and check that it matches
      if (accounts[0]) {
        const DEPOSIT_AMOUNT_X3: BigNumber = DEPOSIT_AMOUNT.mul(3);
        //transfer enough to the test a/c that it can deposit.
        //If you don't mint first you get the error:
        //'Your balance of USDC is too low to deposit this much'
        //but before minting you need the allowance to do that
        //without this next line, you get 'ERC20: insufficient allowance'"
        
        const allowanceForUserTestTx = await cCTokenContract.increaseAllowance(
          accounts[0].address, DEPOSIT_AMOUNT_X3);
        console.log(`allowanceForUserTestTx in cumulative test is ${allowanceForUserTestTx.hash}`);

        const mintForUserTestTx = await cCTokenContract.mint(accounts[0].address, DEPOSIT_AMOUNT_X3);
        console.log(`mintForUserTestTx in cumulative test is ${mintForUserTestTx.hash}`);

        const transferForUserTestTx = await cCTokenContract.transfer(accounts[0].address, DEPOSIT_AMOUNT_X3);
        console.log(`transferForUserTestTx in cumulative test is ${transferForUserTestTx.hash}`);

        const testDepositTx1 = await christmasClubContract.deposit(DEPOSIT_AMOUNT);
        console.log(`testDepositTx for dep 1 in cumulative test is ${testDepositTx1.hash}`);
        const testDepositTx2 = await christmasClubContract.deposit(DEPOSIT_AMOUNT);
        console.log(`testDepositTx for dep 2 in cumulative test is ${testDepositTx2.hash}`);
        const totalAmountSavedBN = await christmasClubContract.totalAmountSaved();
        //USDC has 6 decimal places
        const totalAmountSaved = parseFloat(ethers.utils.formatUnits(totalAmountSavedBN, 6)); //ethers.BigNumber.from(totalGoalAmountBN);
        const TOTAL_EXPECTED_AMOUNT_SAVED = parseFloat(ethers.utils.formatUnits(DEPOSIT_AMOUNT, 6)) * 2;
        expect(totalAmountSaved, `Contract number of savers was ${totalAmountSaved} 
          but expected ${TOTAL_EXPECTED_AMOUNT_SAVED}`
        ).to.equal(TOTAL_EXPECTED_AMOUNT_SAVED);
      } else {
        fail("accounts[0] needs to be defined.");
      }
    });
    */
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
