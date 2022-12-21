import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import {
  ChristmasClub,
  ChristmasClubToken,
  ChristmasClubToken__factory,
  ChristmasClub__factory,
  DateTime,
  DateTime__factory,
} from "../typechain-types";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { describe } from "node:test";
import { BigNumber } from "ethers";
import { fail } from "node:assert";

describe("Christmas Club", function () {
  let accounts: SignerWithAddress[];
  let owner: SignerWithAddress;
  let unlockStartTimeSeconds: number;
  let christmasClubContract: ChristmasClub;
  let christmasClubTokenContract: ChristmasClubToken;
  let christmasClubTokenFactory: ChristmasClubToken__factory;
  

  let dateTimeFactory: DateTime__factory;
  let dateTimeContract: DateTime;
  let dateTimeContractDeployed: boolean = false;

  //we only need the date time contract once.
  async function deployDateTimeContract(signerWithAddress: SignerWithAddress) {
    if (!dateTimeContractDeployed && signerWithAddress) {
      try {
        dateTimeFactory = new DateTime__factory(signerWithAddress);
        dateTimeContract = await dateTimeFactory.deploy();
        await dateTimeContract.deployed();
        console.log(`dateTimeContract deployed at address ${dateTimeContract.address}`);
        dateTimeContractDeployed = true;
      } catch(err) {
        dateTimeContractDeployed = false;
      }
    }
  }


  describe("Deployment - start unlock time in past", function () {
    it("Should fail if the unlockTime is not in the future", async function () {
      // We don't use the beforeEach here because we want a different deployment
      accounts = await ethers.getSigners();
      const unlockStartTime: Date = new Date("2022-12-01"); //YYYY-MM-DD
      //getSeconds() returns 0. //getTime() is milliseconds since 01/01/1970,
      //  divide by 1000 to get seconds
      const unlockStartTimeSeconds = unlockStartTime.getTime() / 1000;
      const unlockStartTimeSecondsBN = ethers.BigNumber.from(
        unlockStartTimeSeconds
      );

      const christmasClubTokenFactory = new ChristmasClubToken__factory(
        accounts[0]
      );
      const christmasClubToken = await christmasClubTokenFactory.deploy();
      await christmasClubToken.deployed();

      await deployDateTimeContract(accounts[0]);

      const christmasClubFactory = new ChristmasClub__factory(accounts[0]);
      await expect(
        christmasClubFactory.deploy(
          //unlockStartTimeSecondsBN,
          christmasClubToken.address,
          dateTimeContract.address
        ),
        ""
      ).to.be.revertedWith("Unlock start time should be in the future");
    });
  });
  /*
  describe("Deployment - future", function () {
    let accounts: SignerWithAddress[];
    let christmasClubContract: ChristmasClub;
    let christmasClubTokenContract: ChristmasClubToken;
    let unlockStartTimeSeconds: number;

    beforeEach(async () => {
      accounts = await ethers.getSigners();
      const unlockStartTime: Date = new Date("2023-12-01"); //YYYY-MM-DD
      //getSeconds() returns 0. //getTime() is milliseconds since 01/01/1970,
      //  divide by 1000 to get seconds
      unlockStartTimeSeconds = unlockStartTime.getTime() / 1000;
      const unlockStartTimeSecondsBN = ethers.BigNumber.from(
        unlockStartTimeSeconds
      );
      const christmasClubTokenFactory = new ChristmasClubToken__factory(
        accounts[0]
      );
      christmasClubTokenContract = await christmasClubTokenFactory.deploy();
      await christmasClubTokenContract.deployed();

      await deployDateTimeContract(accounts[0]);
      const christmasClubFactory = new ChristmasClub__factory(accounts[0]);
      christmasClubContract = await christmasClubFactory.deploy(
        //unlockStartTimeSecondsBN,
        christmasClubTokenContract.address,
        dateTimeContract.address
      );
      await christmasClubContract.deployed();
    });
    it("Should set the right unlockTime", async function () {
      const contractUnlockStartTimeBN =
        await christmasClubContract.unlockStartTime();
      const contractUnlockStartTime = ethers.BigNumber.from(
        contractUnlockStartTimeBN
      );
      expect(
        contractUnlockStartTime,
        `Contract unlock start time was 
        ${contractUnlockStartTime} but expected ${unlockStartTimeSeconds}`
      ).to.equal(unlockStartTimeSeconds);
    }); 
    
    //no public owner atm
    it("Should set the right owner", async function () {
      expect(await christmasClubContract.owner()).to.equal(
        accounts[0]?.address
      );
    }); 
  }); */

  describe("Contract totals", async function () {
    let accounts: SignerWithAddress[];
    let owner: SignerWithAddress;
    let christmasClubContract: ChristmasClub;
    let christmasClubTokenContract: ChristmasClubToken;
    let unlockStartTimeSeconds: number;
    const DEPOSIT_AMOUNT = ethers.BigNumber.from("20");
    const MINT_AMOUNT = ethers.BigNumber.from("2000");

    beforeEach(async () => {
      accounts = await ethers.getSigners();
      const unlockStartTime : Date = new Date("2023-12-01"); //YYYY-MM-DD

      const christmasCCTokenFactory = new ChristmasClubToken__factory(accounts[0]);
      christmasClubTokenContract = await christmasCCTokenFactory.deploy();
      await christmasClubTokenContract.deployed();
      console.log(`Christmas Club Token Contract deployed to ${christmasClubTokenContract.address}`);
      
      await deployDateTimeContract(accounts[0]);
      //mint some money to transfer from, so we can test deposits
      if (accounts[0]) {
        const mintTx = await christmasClubTokenContract.mint(accounts[0].address, MINT_AMOUNT);
        console.log(`mintTx is ${mintTx.hash}`);

        //getSeconds() returns 0. //getTime() is milliseconds since 01/01/1970,
        //  divide by 1000 to get seconds
        unlockStartTimeSeconds = (unlockStartTime.getTime() / 1000);
        const unlockStartTimeSecondsBN = ethers.BigNumber.from(unlockStartTimeSeconds);
        const christmasClubFactory = new ChristmasClub__factory(accounts[0]);
        christmasClubContract = await christmasClubFactory.deploy(
          //unlockStartTimeSecondsBN,
          christmasClubTokenContract.address,
          dateTimeContract.address
        );
        await christmasClubContract.deployed();
        console.log(`Christmas Club Contract deployed to ${christmasClubContract.address}`);
      }
    });

    it("Should show the correct number of total savers", async function () {
      const EXPECTED_INITIAL_SAVER_COUNT = 0;
      const numSaversBN = await christmasClubContract.numberOfSavers();
      //each saver is 1 unit, no decimals
      const numSavers = parseFloat(ethers.utils.formatUnits(numSaversBN, 1)); //ethers.BigNumber.from(numSaversBN);
      expect(
        numSavers,
        `Contract number of savers was ${numSavers} 
        but expected ${EXPECTED_INITIAL_SAVER_COUNT}`
      ).to.equal(EXPECTED_INITIAL_SAVER_COUNT);
    });

    it("Should show the total goal amount set", async function () {
      const EXPECTED_INITIAL_GOAL_AMT = 0;
      const totalGoalAmountBN = await christmasClubContract.totalGoalAmount();
      //USDC has 6 decimal places
      const totalGoalAmount = parseFloat(
        ethers.utils.formatUnits(totalGoalAmountBN, 6)
      ); //ethers.BigNumber.from(totalGoalAmountBN);
      expect(
        totalGoalAmount,
        `Contract goal total was ${totalGoalAmount} 
        but expected ${EXPECTED_INITIAL_GOAL_AMT}`
      ).to.equal(EXPECTED_INITIAL_GOAL_AMT);
    });

    it("Should show the total amount saved", async function () {
      const EXPECTED_INITIAL_SAVINGS_AMT = 0;
      const totalAmountSavedBN = await christmasClubContract.totalAmountSaved();
      //USDC has 6 decimal places
      const totalAmountSaved = parseFloat(
        ethers.utils.formatUnits(totalAmountSavedBN, 6)
      ); //ethers.BigNumber.from(totalGoalAmountBN);
      expect(
        totalAmountSaved,
        `Contract number of savers was ${totalAmountSaved} 
        but expected ${EXPECTED_INITIAL_SAVINGS_AMT}`
      ).to.equal(EXPECTED_INITIAL_SAVINGS_AMT);
    });

    it("Should show the total amount saved cumulatively deposited", async function() {
      //make a deposit and check that it matches
      if (accounts[0]) {
        const DEPOSIT_AMOUNT_X3: BigNumber = DEPOSIT_AMOUNT.mul(3);

        const approveForUserTestTx2 = await christmasClubTokenContract.approve(
          christmasClubContract.address, DEPOSIT_AMOUNT_X3);
        console.log(`approveForUserTestTx2 in cumulative test is ${approveForUserTestTx2.hash}`);

        const testDepositTx1 = await christmasClubContract.deposit(DEPOSIT_AMOUNT);
        console.log(`testDepositTx for dep 1 in cumulative test is ${testDepositTx1.hash}`);

        const testDepositTx2 = await christmasClubContract.deposit(DEPOSIT_AMOUNT);
        console.log(`testDepositTx for dep 2 in cumulative test is ${testDepositTx2.hash}`);
        const totalAmountSavedBN = await christmasClubContract.totalAmountSaved();
        //USDC has 6 decimal places
        const totalAmountSaved = parseFloat(ethers.utils.formatUnits(totalAmountSavedBN, 6));
        const TOTAL_EXPECTED_AMOUNT_SAVED = parseFloat(ethers.utils.formatUnits(DEPOSIT_AMOUNT, 6)) * 2;
        expect(totalAmountSaved, 
          `Contract total amount saved was ${totalAmountSaved} but expected ${TOTAL_EXPECTED_AMOUNT_SAVED}`
        ).to.equal(TOTAL_EXPECTED_AMOUNT_SAVED);
      } else {
        fail("accounts[0] needs to be defined.");
      }
    });    
  });

  describe("Deposit", function () {
    beforeEach(async function () {
      accounts = await ethers.getSigners();
      [owner] = accounts;
      const unlockStartTime: Date = new Date("2023-12-01"); //YYYY-MM-DD
      const unlockStartTimeSeconds = unlockStartTime.getTime() / 1000;
      const unlockStartTimeSecondsBN = ethers.BigNumber.from(
        unlockStartTimeSeconds
      );

      christmasClubTokenFactory = new ChristmasClubToken__factory(accounts[0]);
      christmasClubTokenContract = await christmasClubTokenFactory.deploy();
      await christmasClubTokenContract.deployed();

      await deployDateTimeContract(accounts[0]);

      const christmasClubFactory = new ChristmasClub__factory(accounts[0]);
      christmasClubContract = await christmasClubFactory.deploy(
        //unlockStartTimeSecondsBN,
        christmasClubTokenContract.address,
        dateTimeContract.address
      );
      await christmasClubContract.deployed();
    });
    it("Should not be able to deposit without allowance", async function () {
      const amountToDeposit = ethers.utils.parseEther("0.1");
      await christmasClubTokenContract.mint(owner.address, amountToDeposit);

      await expect(
        christmasClubContract.deposit(amountToDeposit)
      ).to.be.revertedWith("ERC20: insufficient allowance");
    });
    it("Should be able to deposit", async function () {
      const amountToDeposit = ethers.utils.parseEther("0.1");
      await christmasClubTokenContract.mint(owner.address, amountToDeposit);
      await christmasClubTokenContract.approve(
        christmasClubContract.address,
        amountToDeposit
      );
      await expect(christmasClubContract.deposit(amountToDeposit))
        .to.emit(christmasClubContract, "Deposit")
        .withArgs(owner.address, amountToDeposit, anyValue);
    });
  });

  describe("Unlock date times", function () {
    let isUnlockStartTimeWithdrawal:boolean;
    beforeEach(async function () {
      accounts = await ethers.getSigners();
      [owner] = accounts;
      //jump forward a day to make sure it's in the future
      const unlockStartTime: Date = new Date(); //YYYY-MM-DD
      unlockStartTime.setDate(unlockStartTime.getDate() + 1);

      //if this is December, expect true for withdrawal
      isUnlockStartTimeWithdrawal = (unlockStartTime.getMonth() == 11); //0 = Jan, 11 = Dec

      console.log(`Unlock start time set to ${unlockStartTime.toString()}, 
        in withdrawal period ${isUnlockStartTimeWithdrawal}`);
      const unlockStartTimeSeconds = Math.floor(unlockStartTime.getTime() / 1000);
      const unlockStartTimeSecondsBN = ethers.BigNumber.from(
        unlockStartTimeSeconds
      );

      christmasClubTokenFactory = new ChristmasClubToken__factory(accounts[0]);
      christmasClubTokenContract = await christmasClubTokenFactory.deploy();
      await christmasClubTokenContract.deployed();

      await deployDateTimeContract(accounts[0]);

      const christmasClubFactory = new ChristmasClub__factory(accounts[0]);
      christmasClubContract = await christmasClubFactory.deploy(
        //unlockStartTimeSecondsBN,
        christmasClubTokenContract.address,
        dateTimeContract.address
      );
      await christmasClubContract.deployed();
    });
    it("Normally should be in withdrawal period when in December, not otherwise", async function () {
      const inWithdrawalPeriod = await christmasClubContract.isInWithdrawPeriod();
      expect(inWithdrawalPeriod,
        `In withdrawal period returns ${inWithdrawalPeriod} but expected ${isUnlockStartTimeWithdrawal}`)
        .to.equal(isUnlockStartTimeWithdrawal);
    });
    it("Overrides should set to true or false as input", async function () {
      const inWithdrawalPeriodInitially:boolean = await christmasClubContract.isInWithdrawPeriod();
      //flip flop, expect to change from initial one
      const overrideChangedTx = await christmasClubContract.overrideWithdrawForDemo(!inWithdrawalPeriodInitially);
      overrideChangedTx.wait();
      const inWithdrawalPeriodAfterChange1 = await christmasClubContract.isInWithdrawPeriod();
      expect(inWithdrawalPeriodAfterChange1,
        `Change 1. In withdrawal period returns ${inWithdrawalPeriodAfterChange1} but expected ${!inWithdrawalPeriodInitially}`)
        .to.equal(!inWithdrawalPeriodInitially);
      //flip flop back, expect to change back, for 5 minutes
      const overrideChangedTx2 = await christmasClubContract.overrideWithdrawForDemo(inWithdrawalPeriodInitially);
      overrideChangedTx2.wait();
      const inWithdrawalPeriodAfterChange2 = await christmasClubContract.isInWithdrawPeriod();
      expect(inWithdrawalPeriodAfterChange2,
        `Change 2. In withdrawal period returns ${inWithdrawalPeriodAfterChange2} but expected ${inWithdrawalPeriodInitially}`)
        .to.equal(inWithdrawalPeriodInitially);
    });
  });
  //Testing set saver known data via numberOfSavers
  describe("Saver number", function () {
    beforeEach(async function () {
      accounts = await ethers.getSigners();

      christmasClubTokenFactory = new ChristmasClubToken__factory(accounts[0]);
      christmasClubTokenContract = await christmasClubTokenFactory.deploy();
      await christmasClubTokenContract.deployed();

      await deployDateTimeContract(accounts[0]);

      const christmasClubFactory = new ChristmasClub__factory(accounts[0]);
      christmasClubContract = await christmasClubFactory.deploy(
        //unlockStartTimeSecondsBN,
        christmasClubTokenContract.address,
        dateTimeContract.address
      );
      await christmasClubContract.deployed();
    });
    it("should update when setting goal first time, no deposit", async function() {
      const initialNumSaversBN = await christmasClubContract.numberOfSavers();
      const initialNumSaversString = ethers.utils.formatUnits(initialNumSaversBN, 0);
      const initialNumSavers = parseInt(initialNumSaversString);
      console.log(
        `initialNumSaversBN: ${initialNumSaversBN},
        initialNumSaversString: ${initialNumSaversString}, initialNumSavers: ${initialNumSavers}.`);
      
      //set a goal - arbitrary number, e.g. 20
      const setGoal1Tx = await christmasClubContract.setGoal(
        ethers.BigNumber.from("20")
      );
      await setGoal1Tx.wait();
      
      const postSetNumSaversBN = await christmasClubContract.numberOfSavers();
      const postSetNumSaversString = ethers.utils.formatUnits(postSetNumSaversBN, 0);
      const postSetNumSavers = parseInt(postSetNumSaversString);
      console.log(
        `postSetNumSaversBN: ${postSetNumSaversBN},
        postSetNumSaversString: ${postSetNumSaversString}, postSetNumSaversSavers: ${postSetNumSavers}.`);
      
      expect(postSetNumSavers, 
        `Expected to add 1 to numSavers ${initialNumSavers}, but was ${postSetNumSavers}`
      ).to.equal(initialNumSavers + 1);

    });
    it("should not increment when setting goal second time, no deposit", async function() {
      const initialNumSaversBN = await christmasClubContract.numberOfSavers();
      const initialNumSavers = parseInt(ethers.utils.formatUnits(initialNumSaversBN, 0));
      
      //set a goal - arbitrary number, e.g. 20
      const setGoal1Tx = await christmasClubContract.setGoal(
        ethers.BigNumber.from("20")
      );
      await setGoal1Tx.wait();
      
      const postSetNumSaversBN = await christmasClubContract.numberOfSavers();
      const postSetNumSavers = parseInt(ethers.utils.formatUnits(postSetNumSaversBN, 0));
      
      expect(postSetNumSavers, 
        `Expected to add 1 to numSavers ${initialNumSavers}, but was ${postSetNumSavers}`
      ).to.equal(initialNumSavers + 1);

      //set a goal - arbitrary number, e.g. 20
      const setGoal2Tx = await christmasClubContract.setGoal(
        ethers.BigNumber.from("30")
      );
      await setGoal2Tx.wait();
      
      const postSetNumSavers2BN = await christmasClubContract.numberOfSavers();
      const postSetNumSavers2 = parseInt(ethers.utils.formatUnits(postSetNumSavers2BN, 0));
      
      expect(postSetNumSavers2, 
        `Expected no difference between ${postSetNumSavers} and ${postSetNumSavers2}`
      ).to.equal(postSetNumSavers);

    });
    it("should increment for first deposit but not again when setting goal after 1 deposit", 
      async function()
    {
      const initialNumSaversBN = await christmasClubContract.numberOfSavers();
      const initialNumSavers = parseInt(ethers.utils.formatUnits(initialNumSaversBN, 0));

      //ensure in deposit period
      const overrideWithdrawTx = await christmasClubContract.overrideWithdrawForDemo(false);
      await overrideWithdrawTx.wait();

      const amountToDeposit = ethers.utils.parseUnits("20", 6);
      await christmasClubTokenContract.mint(owner.address, amountToDeposit);
      await christmasClubTokenContract.approve(
        christmasClubContract.address,
        amountToDeposit
      );
      const deposit1Tx = await christmasClubContract.deposit(amountToDeposit);
      await deposit1Tx.wait();

      const postDeposit1NumSaversBN = await christmasClubContract.numberOfSavers();
      const postDeposit1NumSavers = parseInt(ethers.utils.formatUnits(postDeposit1NumSaversBN, 0));
      
      expect(postDeposit1NumSavers, 
        `Expected to add 1 to numSavers ${initialNumSavers}, but was ${postDeposit1NumSavers}`
      ).to.equal(initialNumSavers + 1);

      //set a goal - arbitrary number, e.g. 20
      const setGoal1Tx = await christmasClubContract.setGoal(
        ethers.utils.parseUnits("30", 6)
      );
      await setGoal1Tx.wait();
      
      const postSetNumSavers2BN = await christmasClubContract.numberOfSavers();
      const postSetNumSavers2 = parseInt(ethers.utils.formatUnits(postSetNumSavers2BN, 0));
      
      expect(postSetNumSavers2, 
        `Expected no difference between ${postDeposit1NumSavers} and ${postSetNumSavers2}`
      ).to.equal(postDeposit1NumSavers);

    });
    
    it("should increment for first deposit but not again for second deposit", 
      async function()
    {
      const initialNumSaversBN = await christmasClubContract.numberOfSavers();
      const initialNumSavers = parseInt(ethers.utils.formatUnits(initialNumSaversBN, 0));

      //ensure in deposit period
      const overrideWithdrawTx = await christmasClubContract.overrideWithdrawForDemo(false);
      await overrideWithdrawTx.wait();

      const AMOUNT_TO_APPROVE = ethers.utils.parseUnits("50", 6);
      const AMOUNT_TO_DEPOSIT = ethers.utils.parseUnits("20", 6);
      await christmasClubTokenContract.mint(owner.address, AMOUNT_TO_APPROVE);
      await christmasClubTokenContract.approve(
        christmasClubContract.address,
        AMOUNT_TO_APPROVE
      );
      const deposit1Tx = await christmasClubContract.deposit(AMOUNT_TO_DEPOSIT);
      await deposit1Tx.wait();

      const postDeposit1NumSaversBN = await christmasClubContract.numberOfSavers();
      const postDeposit1NumSavers = parseInt(ethers.utils.formatUnits(postDeposit1NumSaversBN, 0));
      
      expect(postDeposit1NumSavers, 
        `Expected to add 1 to numSavers ${initialNumSavers}, but was ${postDeposit1NumSavers}`
      ).to.equal(initialNumSavers + 1);

      //set a goal - arbitrary number, e.g. 20
      const deposit2Tx = await christmasClubContract.deposit(AMOUNT_TO_DEPOSIT);
      await deposit2Tx.wait();
      
      const postSetNumSavers2BN = await christmasClubContract.numberOfSavers();
      const postSetNumSavers2 = parseInt(ethers.utils.formatUnits(postSetNumSavers2BN, 0));
      
      expect(postSetNumSavers2, 
        `Expected no difference between ${postDeposit1NumSavers} and ${postSetNumSavers2}`
      ).to.equal(postDeposit1NumSavers);

    });
    /*it("should update when setting goal first time, no deposit", async function() {


    });*/
  }); 

  
  //Testing set saver known data via numberOfSavers
  describe("Set goal", function () {
    beforeEach(async function () {
      accounts = await ethers.getSigners();

      christmasClubTokenFactory = new ChristmasClubToken__factory(accounts[0]);
      christmasClubTokenContract = await christmasClubTokenFactory.deploy();
      await christmasClubTokenContract.deployed();

      await deployDateTimeContract(accounts[0]);

      const christmasClubFactory = new ChristmasClub__factory(accounts[0]);
      christmasClubContract = await christmasClubFactory.deploy(
        //unlockStartTimeSecondsBN,
        christmasClubTokenContract.address,
        dateTimeContract.address
      );
      await christmasClubContract.deployed();
    });

    it("shold not allow goal to be less than existing deposit", 
      async function()
    {
      const initialNumSaversBN = await christmasClubContract.numberOfSavers();
      const initialNumSavers = parseInt(ethers.utils.formatUnits(initialNumSaversBN, 0));

      //ensure in deposit period
      const overrideWithdrawTx = await christmasClubContract.overrideWithdrawForDemo(false);
      await overrideWithdrawTx.wait();

      const amountToDeposit = ethers.utils.parseEther("0.1");
      await christmasClubTokenContract.mint(owner.address, amountToDeposit);
      await christmasClubTokenContract.approve(
        christmasClubContract.address,
        amountToDeposit
      );
      const deposit1Tx = await christmasClubContract.deposit(amountToDeposit);
      await deposit1Tx.wait();

      const postDeposit1NumSaversBN = await christmasClubContract.numberOfSavers();
      const postDeposit1NumSavers = parseInt(ethers.utils.formatUnits(postDeposit1NumSaversBN, 0));
      
      await expect(christmasClubContract.setGoal(ethers.BigNumber.from("20")), 
        `Expected revert on goal amount less than deposit`
      ).to.be.revertedWith('Your goal must be greater than amount already deposited');

    });
    it("shold allow goal to be set that is greater than existing deposit", 
      async function()
    {
      const initialNumSaversBN = await christmasClubContract.numberOfSavers();
      const initialNumSavers = parseInt(ethers.utils.formatUnits(initialNumSaversBN, 0));

      //ensure in deposit period
      const overrideWithdrawTx = await christmasClubContract.overrideWithdrawForDemo(false);
      await overrideWithdrawTx.wait();

      const amountToDeposit = ethers.utils.parseUnits("20", 6);
      await christmasClubTokenContract.mint(owner.address, amountToDeposit);
      await christmasClubTokenContract.approve(
        christmasClubContract.address,
        amountToDeposit
      );
      const deposit1Tx = await christmasClubContract.deposit(amountToDeposit);
      await deposit1Tx.wait();

      const postDeposit1NumSaversBN = await christmasClubContract.numberOfSavers();
      const postDeposit1NumSavers = parseInt(ethers.utils.formatUnits(postDeposit1NumSaversBN, 0));
      const GOAL_TO_SET = 120;
      const setGoal1Tx = await christmasClubContract.setGoal(
        ethers.utils.parseUnits(GOAL_TO_SET.toString(), 6)
      );
      await setGoal1Tx.wait();

      const totalGoalBN = await christmasClubContract.totalGoalAmount();
      
      const totalGoal = parseInt(ethers.utils.formatUnits(totalGoalBN, 6));
      expect(totalGoal, 
        `Expected goal to be ${GOAL_TO_SET} after setting but was ${totalGoal}`
      ).to.equal(GOAL_TO_SET);

    });
  }); 
});
