// run.js — Script de coordinación on-chain para Monad Testnet (ethers v6)
// Uso: node scripts/run.js [archivo_json]
const ethers = require('ethers');
const fs = require('fs');
const path = require('path');

const MONAD_CHAIN_ID = 10143;
const GAS_PRICE = 50_000_000_000n; // 50 gwei
const GAS_LIMIT = 500_000;

async function main() {
    const dataFile = process.argv[2] || path.join(__dirname, 'data', 'emergencia_choco.json');
    const raw = fs.readFileSync(dataFile, 'utf-8');
    const data = JSON.parse(raw);
    const families = data.familias || [];
    const centers = data.centros || [];

    console.log('╔══════════════════════════════════════════╗');
    console.log('║        MONAD NEXUS — COORDINACIÓN        ║');
    console.log('╚══════════════════════════════════════════╝');
    console.log(`Cargados ${families.length} familias y ${centers.length} centros desde ${dataFile}`);

    // Cargar .env
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
        const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
        lines.forEach(line => {
            const [key, ...vals] = line.split('=');
            if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
        });
    }

    const rpcUrl = process.env.RPC_URL;
    const privateKey = process.env.PRIVATE_KEY;
    const engineAddr = process.env.ENGINE_ADDRESS;
    const workerAddr = process.env.WORKER_ADDRESS;
    const donationAddr = process.env.DONATION_ADDRESS;

    if (!rpcUrl || !privateKey || !engineAddr || !workerAddr) {
        console.error('❌ ERROR: Completa .env con RPC_URL, PRIVATE_KEY, ENGINE_ADDRESS y WORKER_ADDRESS');
        process.exit(1);
    }

    // Conectar a Monad Testnet con ENS desactivado
    const network = ethers.Network.from(MONAD_CHAIN_ID);
    const provider = new ethers.JsonRpcProvider(rpcUrl, network, { staticNetwork: network });
    const wallet = new ethers.Wallet(privateKey, provider);

    console.log(`\nWallet: ${wallet.address}`);

    const balance = await provider.getBalance(wallet.address);
    console.log(`Saldo: ${ethers.formatEther(balance)} MON`);

    if (balance === 0n) {
        console.error('❌ ERROR: La wallet no tiene fondos en Monad Testnet.');
        console.log('   Obtén MON gratis en el faucet: https://testnet.monad.xyz/faucet');
        process.exit(1);
    }

    // Instanciar contratos
    const engineArtifact = [
        'function createJob(uint256 _totalTasks) external',
        'function completeTask(uint256 _taskId, uint256 _result) external',
        'function getStats() external view returns (uint256 total, uint256 completed, uint256 createdBlock, uint256 completedBlock)',
        'function totalTasks() external view returns (uint256)',
        'function completedTasks() external view returns (uint256)',
        'function allDone() external view returns (bool)',
        'function jobBlock() external view returns (uint256)',
        'function completedBlock() external view returns (uint256)'
    ];

    const workerArtifact = [
        'function solve(int256 lat1, int256 lng1, int256 lat2, int256 lng2) external pure returns (uint256)'
    ];

    const engine = new ethers.Contract(engineAddr, engineArtifact, wallet);
    const worker = new ethers.Contract(workerAddr, workerArtifact, wallet);

    // Crear job
    console.log(`\n📋 Creando job con ${families.length} tareas...`);
    const tx1 = await engine.createJob(families.length, {
        gasPrice: GAS_PRICE,
        gasLimit: GAS_LIMIT
    });
    const receipt1 = await tx1.wait();
    console.log(`   ✅ Job creado en tx: ${receipt1.hash}`);

    // Ejecutar tareas
    console.log(`\n⚙️  Ejecutando ${families.length} tareas...`);
    for (let i = 0; i < families.length; i++) {
        const f = families[i];
        const c = centers[i % centers.length];

        const result = await worker.solve(
            BigInt(f.lat), BigInt(f.lng),
            BigInt(c.lat), BigInt(c.lng)
        );

        const tx = await engine.completeTask(f.id, result, {
            gasPrice: GAS_PRICE,
            gasLimit: GAS_LIMIT
        });
        await tx.wait();

        if ((i + 1) % 100 === 0 || i === families.length - 1) {
            console.log(`   Progreso: ${i + 1}/${families.length} tareas completadas`);
        }
    }

    // Mostrar estadísticas finales
    const stats = await engine.getStats();
    console.log(`\n📊 Estadísticas finales:`);
    console.log(`   Total tareas:     ${stats.total}`);
    console.log(`   Completadas:      ${stats.completed}`);
    console.log(`   Bloque creación:  ${stats.createdBlock}`);
    console.log(`   Bloque fin:       ${stats.completedBlock}`);
    console.log(`\n🔗 Explorador: https://testnet.monadexplorer.com/tx/${receipt1.hash}`);
    console.log(`\n✅ Coordinación completada exitosamente`);
}

main().catch(err => {
    console.error('❌ Error:', err.message || err);
    process.exit(1);
});
