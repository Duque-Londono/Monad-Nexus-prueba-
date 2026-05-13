# 🛡️ Monad Nexus — DeCompute Coordinativo

**Monad Nexus** es el primer Motor de Coordinación Descentralizada Verificable sobre **Monad Testnet** (chain ID 10143). Permite ejecutar tareas de coordinación (logística humanitaria, ciberseguridad, farmacéutica) con verificación on-chain, sin necesidad de confiar en una autoridad central.

---

## 📐 Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (nexus-viz.html)          │
│  ┌───────────┐  ┌──────────────┐  ┌───────────────┐ │
│  │MapRenderer │  │CardsRenderer │  │ChartRenderer   │ │
│  │ (Leaflet)  │  │ (Grid+CSS)   │  │ (Bar+CSS)     │ │
│  └─────┬─────┘  └──────┬───────┘  └───────┬───────┘ │
│        └───────────────┬┴──────────────────┘         │
│                        ▼                             │
│               ┌────────────────┐                     │
│               │   Dashboard    │                     │
│               │ (Wallet + Demo)│                     │
│               └───────┬────────┘                     │
└───────────────────────┼─────────────────────────────┘
                        │
┌───────────────────────┼─────────────────────────────┐
│  On-Chain (Monad)     ▼                             │
│  ┌──────────────┐  ┌──────────┐  ┌───────────────┐ │
│  │ NexusEngine  │  │NexusWorker│  │ DonationVault │ │
│  │ (coordinator) │  │ (solver)  │  │ (donations)   │ │
│  └──────────────┘  └──────────┘  └───────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Guía Rápida (4 pasos)

### 1. Configurar entorno

```bash
cp .env.example .env
```

Editar `.env` con tus claves:

| Variable | Descripción |
|---|---|
| `RPC_URL` | RPC de Monad Testnet (ej: Alchemy) |
| `PRIVATE_KEY` | Clave privada de tu wallet (con 0x) |
| `ENGINE_ADDRESS` | Dirección del NexusEngine deployado |
| `WORKER_ADDRESS` | Dirección del NexusWorker deployado |
| `DONATION_ADDRESS` | Dirección del DonationVault deployado |

### 2. Desplegar contratos

Orden de despliegue recomendado:

```bash
# 1. Worker (no tiene dependencias)
forge create contracts/NexusWorker.sol:NexusWorker --rpc-url $RPC_URL --private-key $PRIVATE_KEY

# 2. Engine (no tiene dependencias)
forge create contracts/NexusEngine.sol:NexusEngine --rpc-url $RPC_URL --private-key $PRIVATE_KEY

# 3. DonationVault (no tiene dependencias)
forge create contracts/DonationVault.sol:DonationVault --rpc-url $RPC_URL --private-key $PRIVATE_KEY
```

> También puedes usar Remix IDE o hardhat. Los contratos son Solidity 0.8.20 puro, sin dependencias.

### 3. Ejecutar coordinación

```bash
npm install
node scripts/run.js
```

Para usar un archivo de datos diferente:

```bash
node scripts/run.js scripts/data/auditoria_endpoints.json
```

### 4. Abrir frontend

Abre `frontend/nexus-viz.html` en tu navegador (o usa Live Server en VS Code).

Conecta tu wallet MetaMask y selecciona una demo:

| Demo | Descripción | Visualización |
|---|---|---|
| 🚚 Logística Humanitaria | Coordinación de ayuda en Chocó | Mapa Leaflet con rutas |
| 🛡️ Ciberseguridad | Auditoría de endpoints | Tarjetas con estado |
| 🧬 Farmacéutica | Efectividad de moléculas | Barras de progreso |

---

## 📦 Stack Técnico

| Capa | Tecnología |
|---|---|
| **Smart Contracts** | Solidity 0.8.20 (sin dependencias) |
| **Scripts** | Node.js + ethers v6 |
| **Frontend** | HTML + CSS + JS vanilla |
| **Mapa** | Leaflet 1.9.4 (CDN) |
| **Blockchain** | ethers v5.7.2 (CDN frontend) / ethers v6 (scripts) |
| **Red** | Monad Testnet (chain ID 10143) |

---

## 🔍 Verificación

Para verificar que todo funciona:

1. **Contratos**: `npx solc --version` (debe mostrar 0.8.20)
2. **Script**: `node scripts/run.js` (debe conectar y ejecutar)
3. **Frontend**: Abrir `nexus-viz.html` → Conectar wallet → Iniciar coordinación → Verificar on-chain
4. **Explorador**: `https://testnet.monadexplorer.com`

---

## 📄 Licencia

MIT
