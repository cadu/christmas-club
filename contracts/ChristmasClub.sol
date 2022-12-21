// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

// Uncomment this line to use console.log
import "hardhat/console.sol";
interface ICCToken {
    function mint(address to, uint256 amount) external;

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);

    function balanceOf(address account) external returns (uint256);
}

//Impl courtesy of https://github.com/pipermerriam/ethereum-datetime
interface MonthAPI {
    function getMonth(uint timestamp) external view returns (uint8);
}


contract ChristmasClub is Ownable {
    
    ///@notice future from now, matching very end of 31/Dec of the year.
    //If now is > unlockEndTime, then we're in the next year so bump forward
    //both unlockStartTime and unlockEndTime by one year.
    uint public unlockEndTime;

    uint256 public numberOfSavers = 0;

    uint256 public totalGoalAmount = 0;

    uint256 public totalAmountSaved = 0;

    uint256 private overrideWithdrawalTrueUntil = 0;

    uint256 private overrideWithdrawalFalseUntil = 0;

    mapping (address => uint256) saverAmounts;

    mapping (address => uint256) goalAmounts;

    mapping (address => bool) private preExistingSavers;

    uint256 constant FIVE_MINUTES_IN_SECONDS = 60 * 5;

    /*
    parse() {
        _unlockStartTime = parseToSeconds(concat(unlockDate,  block.currentYear));

        if  block.timestamp < _unlockStartTime  { //we're in saving period, otherwise withdrawal period }
    }
    e.g. uint256 currentYear = floor(block.timestamp / numSecondsInAYear);  //ignore remainder, use floor if available
         uint256 unlockTime  = (currentYear * numSecondsInAYear) - numberOfSecondsInDecember;
         //compare timestamp against unlockTime for savingPeriod / withdrawalPeriod
    */

    ICCToken public savingsToken;
    
    MonthAPI public monthTeller;

    event Withdrawal(address saver, uint amount, uint when);

    event Deposit(address saver, uint amount, uint when);

    constructor(address _savingsToken, address _monthAPIImpl) {
        
        savingsToken = ICCToken(_savingsToken);
        monthTeller = MonthAPI(_monthAPIImpl);
    }
    //from openzeppelin SafeMath
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }

    function setGoal(uint256 goalAmount) public {

        require(goalAmount > 0, "You must have a savings goal greater than zero");
        require(goalAmount >= saverAmounts[address(msg.sender)],
          "Your goal must be greater than amount already deposited");
        uint256 priorGoalAmount = goalAmounts[msg.sender];
        
        totalGoalAmount = add(sub(totalGoalAmount, priorGoalAmount), goalAmount);

        goalAmounts[msg.sender] = goalAmount;
        setSaverKnownData();

    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(isInWithdrawPeriod(), "You can't withdraw yet");
        require(saverAmounts[address(msg.sender)] > 0, "You must have savings to withdraw");
        
        uint256 withdrawalAmount = saverAmounts[address(msg.sender)];

        //reduce the saver's amount saved by the amount withdrawn
        saverAmounts[msg.sender] -= withdrawalAmount;
        //reduce the overall amount saved in the contract by the amount withdrawn
        totalAmountSaved -= withdrawalAmount;

        savingsToken.transfer(msg.sender, withdrawalAmount);

        emit Withdrawal(address(msg.sender), withdrawalAmount, block.timestamp);

    }

    function deposit(uint256 amount) public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
        require(!isInWithdrawPeriod(), "Too late to make another deposit this year - you can withdraw now");

        require(savingsToken.balanceOf(msg.sender) >= amount, "Your balance of USDC is too low to deposit this much");

        // console.log("depositing:",amount);

        //transferFrom their balance to the club for safe keeping
        savingsToken.transferFrom(msg.sender, address(this), amount);

        saverAmounts[msg.sender] += amount;
        totalAmountSaved += amount;
        setSaverKnownData();

        emit Deposit(address(msg.sender), amount, block.timestamp);
       
    }

    function getSaverAmount() view external returns (uint256 amount) {
        amount = saverAmounts[msg.sender];
    }

    function getSaverGoal() view external returns (uint256 amount) {
        amount = goalAmounts[msg.sender];
    }

    function overrideWithdrawForDemo(bool inWithdrawalPeriod) public {
        if (inWithdrawalPeriod) {
            //set true for 5 minutes
            overrideWithdrawalFalseUntil = 0;
            overrideWithdrawalTrueUntil = (block.timestamp + FIVE_MINUTES_IN_SECONDS);
        } else { 
            //set false for 5 minutes
            overrideWithdrawalFalseUntil = (block.timestamp + FIVE_MINUTES_IN_SECONDS);
            overrideWithdrawalTrueUntil = 0;

        }
    }
    function isInWithdrawPeriod() view public returns(bool ) {
        //check the demo overrides first
        if (overrideWithdrawalFalseUntil > block.timestamp) {
            return false;
        }
        if (overrideWithdrawalTrueUntil > block.timestamp) {
            return true;
        }
        //if neither override is in effect, get the December test result
        return (monthTeller.getMonth(block.timestamp) == 12);
    }

    function setSaverKnownData() internal {     
        bool saverWasInSystemBeforeThis = preExistingSavers[msg.sender];
        //if it's a new saver we need to now mark it as known and increment numberOfSavers
        if (!saverWasInSystemBeforeThis) {
            numberOfSavers++;
            preExistingSavers[msg.sender] = true;
        }
    }
}
