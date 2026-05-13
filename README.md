# Monad Nexus

**Plataforma de Coordinacion Descentralizada Verificable en Tiempo Real**

## Despliegue Rapido

1. Configurar `.env` con los datos reales
2. Desplegar contratos en Remix (orden: Worker -> Engine -> Donation)
3. Ejecutar `node scripts/run.js`
4. Abrir `frontend/nexus-viz.html` en el navegador

## Stack Tecnico

- Monad Testnet (chain ID 10143)
- Solidity 0.8.20
- ethers.js v6 (script) / v5.7.2 (frontend)
- Leaflet 1.9.4
- Node.js v18+

## Checklist Pre-Demo

- [ ] Contratos desplegados en Monad Testnet
- [ ] `.env` configurado con direcciones reales
- [ ] Script `run.js` probado con 10 tareas
- [ ] Frontend `nexus-viz.html` mostrando mapa
- [ ] Explosion verde verificada
- [ ] Donacion de prueba realizada

## Verificacion On-Chain

Explorador: https://testnet.monadexplorer.com
