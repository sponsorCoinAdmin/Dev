// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
// use latest solidity version at time of writing, need not worry about overflow and underflow

/// @title ERC20 Contract

contract T {

    // My Variables
    string public name;
    string public symbol;
    uint256 public decimals;
    uint256 public totalSupply;

    // Keep track balances and allowances approved
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // Events - fire events on state changes etc
 
   constructor(uint _decimals) {
 //      decimals = _decimals;
    }

//   constructor(string memory _name, string memory _symbol, uint _decimals, uint _totalSupply) {
//        name = _name;
//        symbol = _symbol;
//       decimals = _decimals;
//       totalSupply = _totalSupply; 
//       balanceOf[msg.sender] = totalSupply;
//    }

 }
