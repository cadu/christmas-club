// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ChristmasClub {
    ///@notice future from now, matching 01/Dec of the year. 
    uint256 public unlockStartTime;
    
    ///@notice future from now, matching very end of 31/Dec of the year.
    //If now is > unlockEndTime, then we're in the next year so bump forward
    //both unlockStartTime and unlockEndTime by one year.
    uint public unlockEndTime;

    uint256 public numberOfSavers = 0;

    uint256 public totalGoalAmount = 0;

    uint256 public totalAmountSaved = 0;

    
    address payable public owner;

    mapping (address => uint256) saverAmounts;

    event Withdrawal(uint amount, uint when);

    event Deposit(uint amount, uint when);

    constructor(uint256 _unlockStartTime) payable {
        require(
            block.timestamp < _unlockStartTime,
            "Unlock start time should be in the future"
        );

        unlockStartTime = _unlockStartTime;
        owner = payable(msg.sender);
    }

    
    function getX() public view returns(uint256) {
        return numberOfSavers;
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockStartTime, "You can't withdraw yet");
        //require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }

    function deposit(uint256 amount) public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp <= unlockStartTime, "Too late to make another deposit - you can withdraw now");
        require(msg.sender == owner, "You aren't the owner");

        emit Deposit(address(this).balance, block.timestamp);

        saverAmounts[msg.sender] += amount;
    }
}
