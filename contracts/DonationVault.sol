// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DonationVault
 * @notice Contrato simple para recibir donaciones durante la demo
 */
contract DonationVault {
    address public owner;
    uint256 public totalDonations;
    uint256 public donorCount;
    mapping(address => uint256) public donations;
    mapping(address => bool) private isDonor;
    address[] private donorList;

    event DonationReceived(address indexed donor, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function donate() external payable {
        require(msg.value > 0, "Donacion minima: 0.0001 MON");
        donations[msg.sender] += msg.value;
        totalDonations += msg.value;
        _registerDonor(msg.sender);
        emit DonationReceived(msg.sender, msg.value);
    }

    function getStats()
        external
        view
        returns (uint256 total, uint256 donors)
    {
        return (totalDonations, donorCount);
    }

    function getDonor(uint256 index)
        external
        view
        returns (address donor, uint256 amount)
    {
        require(index < donorList.length, "Indice fuera de rango");
        address d = donorList[index];
        return (d, donations[d]);
    }

    function getDonorCount() external view returns (uint256) {
        return donorList.length;
    }

    function _registerDonor(address _donor) private {
        if (!isDonor[_donor]) {
            isDonor[_donor] = true;
            donorList.push(_donor);
            donorCount++;
        }
    }

    receive() external payable {
        donations[msg.sender] += msg.value;
        totalDonations += msg.value;
        _registerDonor(msg.sender);
        emit DonationReceived(msg.sender, msg.value);
    }
}
