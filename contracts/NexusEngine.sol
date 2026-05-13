// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title NexusEngine
 * @notice Orquestador central de Monad Nexus
 * @dev Coordina microtareas con redundancia 2-de-3 y emite prueba on-chain
 */
contract NexusEngine {
    address public owner;
    uint256 public jobCount;

    struct Task {
        uint256 id;
        bool completed;
        uint256 result;
        uint8 confirmations;
    }

    mapping(uint256 => mapping(uint256 => Task)) public tasks;
    mapping(uint256 => uint256) public taskCount;
    mapping(uint256 => bool) public jobCompleted;
    mapping(uint256 => uint256) public jobCreatedBlock;
    mapping(uint256 => uint256) public jobCompletedBlock;

    event JobCreated(
        uint256 indexed jobId,
        uint256 totalTasks,
        uint256 blockNumber
    );
    event TaskCommitted(
        uint256 indexed jobId,
        uint256 taskId,
        bytes32 hash
    );
    event TaskRevealed(
        uint256 indexed jobId,
        uint256 taskId,
        uint256 result
    );
    event TaskCompleted(
        uint256 indexed jobId,
        uint256 taskId,
        uint256 result
    );
    event AllTasksCompleted(uint256 indexed jobId, uint256 blockNumber);

    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createJob(uint256 _totalTasks) external onlyOwner {
        jobCount++;
        taskCount[jobCount] = _totalTasks;
        jobCreatedBlock[jobCount] = block.number;
        emit JobCreated(jobCount, _totalTasks, block.number);
    }

    function commitTask(
        uint256 _jobId,
        uint256 _taskId,
        bytes32 _resultHash
    ) external {
        require(_jobId > 0 && _jobId <= jobCount, "Job invalido");
        require(_taskId < taskCount[_jobId], "Tarea invalida");
        require(
            tasks[_jobId][_taskId].confirmations < 2,
            "Ya completada"
        );

        tasks[_jobId][_taskId].id = _taskId;
        emit TaskCommitted(_jobId, _taskId, _resultHash);
    }

    function revealTask(
        uint256 _jobId,
        uint256 _taskId,
        uint256 _result
    ) external {
        require(_jobId > 0 && _jobId <= jobCount, "Job invalido");
        require(_taskId < taskCount[_jobId], "Tarea invalida");

        Task storage t = tasks[_jobId][_taskId];
        require(t.confirmations < 2, "Ya confirmada");

        if (t.confirmations == 0) {
            t.result = _result;
        } else {
            require(t.result == _result, "Resultado no coincide");
        }
        t.confirmations++;
        emit TaskRevealed(_jobId, _taskId, _result);

        if (t.confirmations >= 2) {
            t.completed = true;
            emit TaskCompleted(_jobId, _taskId, _result);

            bool allDone = true;
            for (uint256 i = 0; i < taskCount[_jobId]; i++) {
                if (tasks[_jobId][i].confirmations < 2) {
                    allDone = false;
                    break;
                }
            }

            if (allDone && !jobCompleted[_jobId]) {
                jobCompleted[_jobId] = true;
                jobCompletedBlock[_jobId] = block.number;
                emit AllTasksCompleted(_jobId, block.number);
            }
        }
    }

    function getStats(
        uint256 _jobId
    )
        external
        view
        returns (
            uint256 total,
            uint256 completed,
            uint256 createdBlock,
            uint256 completedBlock
        )
    {
        return (
            taskCount[_jobId],
            _countCompleted(_jobId),
            jobCreatedBlock[_jobId],
            jobCompletedBlock[_jobId]
        );
    }

    function _countCompleted(
        uint256 _jobId
    ) private view returns (uint256 count) {
        for (uint256 i = 0; i < taskCount[_jobId]; i++) {
            if (tasks[_jobId][i].completed) count++;
        }
    }
}
