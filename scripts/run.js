const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

const data = JSON.parse(
  fs.readFileSync(__dirname + "/emergencia_choco.json", "utf8")
);
const families = data.familias;
const centers = data.centros;

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ENGINE_ADDRESS = process.env.ENGINE_ADDRESS;
const WORKER_ADDRESS = process.env.WORKER_ADDRESS;

const ENGINE_ABI = [
  "function createJob(uint256 _totalTasks) external",
  "function commitTask(uint256 _jobId, uint256 _taskId, bytes32 _resultHash) external",
  "function revealTask(uint256 _jobId, uint256 _taskId, uint256 _result) external",
  "function getStats(uint256 _jobId) external view returns (uint256 total, uint256 completed, uint256 createdBlock, uint256 completedBlock)",
];

const WORKER_ABI = [
  "function solve(int256 lat1, int256 lng1, int256 lat2, int256 lng2) public pure returns (uint256)",
];

async function main() {
  console.log("Monad Nexus - Iniciando coordinacion...\n");

  const provider = new ethers.JsonRpcProvider(RPC_URL, undefined, {
    staticNetwork: new ethers.Network("monad-testnet", 10143),
  });
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const engine = new ethers.Contract(ENGINE_ADDRESS, ENGINE_ABI, wallet);
  const worker = new ethers.Contract(WORKER_ADDRESS, WORKER_ABI, wallet);

  const totalTasks = families.length;
  console.log(`Total de tareas: ${totalTasks}`);
  console.log(`Centros de ayuda: ${centers.length}\n`);

  const balance = await provider.getBalance(wallet.address);
  console.log(`Saldo: ${ethers.formatEther(balance)} MON\n`);

  // 1. Crear trabajo
  console.log("Creando trabajo...");
  let tx = await engine.createJob(totalTasks, { gasLimit: 500000 });
  await tx.wait();
  console.log("Trabajo creado\n");

  // 2. Fase Commit
  console.log("Fase 1: Commit de resultados...");
  for (let i = 0; i < totalTasks; i++) {
    const hash = ethers.keccak256(
      ethers.toUtf8Bytes(`task-${i}-pre`)
    );
    try {
      tx = await engine.commitTask(1, i, hash, { gasLimit: 200000 });
      await tx.wait();
      if (i % 100 === 0)
        console.log(`   Commit: ${i}/${totalTasks}`);
    } catch (e) {
      console.log(`   Error en commit ${i}: ${e.message}`);
    }
  }
  console.log("Fase Commit completada\n");

  // 3. Fase Reveal
  console.log("Fase 2: Reveal de resultados...");
  const center = centers[0];
  for (let i = 0; i < totalTasks; i++) {
    const family = families[i];

    try {
      const result = await worker.solve(
        family.lat,
        family.lng,
        center.lat,
        center.lng
      );

      tx = await engine.revealTask(1, i, result, {
        gasLimit: 200000,
      });
      await tx.wait();
      tx = await engine.revealTask(1, i, result, {
        gasLimit: 200000,
      });
      await tx.wait();

      if (i % 100 === 0)
        console.log(
          `   Reveal: ${i}/${totalTasks} - Distancia: ${result}m`
        );
    } catch (e) {
      console.log(`   Error en reveal ${i}: ${e.message}`);
    }
  }
  console.log("Fase Reveal completada\n");

  // 4. Verificar estadisticas finales
  const stats = await engine.getStats(1);
  console.log("ESTADISTICAS FINALES:");
  console.log(`   Total tareas: ${stats.total}`);
  console.log(`   Completadas: ${stats.completed}`);
  console.log(`   Bloque creacion: ${stats.createdBlock}`);
  console.log(`   Bloque finalizacion: ${stats.completedBlock}`);
  console.log(
    `\nVerificar en: https://testnet.monadexplorer.com/address/${ENGINE_ADDRESS}`
  );
  console.log("\nMonad Nexus - Coordinacion completada exitosamente");
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
