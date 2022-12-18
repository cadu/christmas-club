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


contract ChristmasClub is Ownable {
    ///@notice future from now, matching 01/Dec of the year. 
    uint256 public unlockStartTime;
    
    ///@notice future from now, matching very end of 31/Dec of the year.
    //If now is > unlockEndTime, then we're in the next year so bump forward
    //both unlockStartTime and unlockEndTime by one year.
    uint public unlockEndTime;

    uint256 public numberOfSavers = 0;

    uint256 public totalGoalAmount = 0;

    uint256 public totalAmountSaved = 0;

    mapping (address => uint256) saverAmounts;

    mapping (address => uint256) goalAmounts;

    string constant unlockDate = '01/Dec/' ;      

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

    event Withdrawal(address saver, uint amount, uint when);

    event Deposit(address saver, uint amount, uint when);

    constructor(uint256 _unlockStartTime, address _savingsToken) {
        require(
            block.timestamp < _unlockStartTime,
            "Unlock start time should be in the future"
        );

        unlockStartTime = _unlockStartTime;
        savingsToken = ICCToken(_savingsToken);
    }

    function increaseSavers(uint256 _num) public returns (uint256) {
        numberOfSavers += _num;
        return numberOfSavers;
    }

    function setGoal(uint256 goalAmount) public {

        require(goalAmount > 0, "You must have a savings goal greater than zero");

        goalAmounts[msg.sender] = goalAmount;

    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockStartTime, "You can't withdraw yet");
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
        require(block.timestamp <= unlockStartTime, "Too late to make another deposit - you can withdraw now");

        require(savingsToken.balanceOf(msg.sender) >= amount, "Your balance of USDC is too low to deposit this much");

        // console.log("depositing:",amount);

        //transferFrom their balance to the club for safe keeping
        savingsToken.transferFrom(msg.sender, address(this), amount);

        saverAmounts[msg.sender] += amount;

        totalAmountSaved += amount;

        emit Deposit(address(msg.sender), amount, block.timestamp);
       
    }

    function getSaverAmount() view external returns (uint256 amount) {
        amount = saverAmounts[msg.sender];
    }
}
