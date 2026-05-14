export var CONFIG = {
  chainId: 10143,
  rpcUrl: 'https://monad-testnet.g.alchemy.com/v2/TU_API_KEY',
  engineAddress: '0x0000000000000000000000000000000000000000',
  workerAddress: '0x0000000000000000000000000000000000000000',
  donationAddress: '0x0000000000000000000000000000000000000000',
  demoWallet: '0xD92f557b538d5Cf5fd680698f9062254e5689a0d'
};

export var DEMOS = {
  logistica: {
    title: 'Logística Humanitaria',
    icon: '🚚',
    dataFile: 'scripts/data/emergencia_choco.json',
    renderer: 'map-renderer'
  },
  ciberseguridad: {
    title: 'Ciberseguridad',
    icon: '🛡️',
    dataFile: 'scripts/data/auditoria_endpoints.json',
    renderer: 'cards-renderer'
  },
  farmaceutica: {
    title: 'Farmacéutica',
    icon: '🧬',
    dataFile: 'scripts/data/moleculas_simuladas.json',
    renderer: 'chart-renderer'
  }
};
