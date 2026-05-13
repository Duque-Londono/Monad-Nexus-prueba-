// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract NexusWorker {
    function solve(int256 lat1, int256 lng1, int256 lat2, int256 lng2) public pure returns (uint256) {
        int256 dlat = lat1 - lat2;
        int256 dlng = lng1 - lng2;
        if (dlat < 0) dlat = -dlat;
        if (dlng < 0) dlng = -dlng;
        return uint256(dlat + dlng);
    }
}
