// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract NexusEngine {
    uint256 public totalTasks;
    uint256 public completedTasks;
    bool public allDone;
    uint256 public jobBlock;
    uint256 public completedBlock;

    event JobCreated(uint256 indexed jobId, uint256 total, uint256 blockNum);
    event TaskCompleted(uint256 taskId, uint256 result);
    event AllTasksCompleted(uint256 blockNum);

    function createJob(uint256 _total) external {
        totalTasks = _total;
        completedTasks = 0;
        allDone = false;
        jobBlock = block.number;
        emit JobCreated(1, _total, block.number);
    }

    function completeTask(uint256 _taskId, uint256 _result) external {
        require(!allDone, "Already done");
        completedTasks++;
        emit TaskCompleted(_taskId, _result);
        if (completedTasks >= totalTasks) {
            allDone = true;
            completedBlock = block.number;
            emit AllTasksCompleted(block.number);
        }
    }

    function getStats() external view returns (uint256 total, uint256 completed, uint256 createdBlock, uint256 doneBlock) {
        return (totalTasks, completedTasks, jobBlock, completedBlock);
    }
}
