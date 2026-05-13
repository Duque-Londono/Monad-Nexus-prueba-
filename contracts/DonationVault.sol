// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract DonationVault {
    address public owner;
    uint256 public totalDonations;
    mapping(address => uint256) public donations;

    event DonationReceived(address indexed donor, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        owner = msg.sender;
    }

    function donate() external payable {
        require(msg.value > 0, "Must send ETH");
        donations[msg.sender] += msg.value;
        totalDonations += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    function getStats() external view returns (uint256 total, uint256 donors) {
        return (totalDonations, 0);
    }

    receive() external payable {
        totalDonations += msg.value;
    }
}
