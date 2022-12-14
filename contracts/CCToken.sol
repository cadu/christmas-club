// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract ChristmasClubToken is ERC20, ERC20Burnable {
    constructor() ERC20("Christmas Club Token", "CCT") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}
