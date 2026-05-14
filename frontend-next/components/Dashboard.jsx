'use client'

import dynamic from 'next/dynamic'
import TopBar from './TopBar'
import DemoSelector from './DemoSelector'
import ControlPanel from './ControlPanel'
import DonationPanel from './DonationPanel'
import CardsRenderer from './renderers/CardsRenderer'
import ChartRenderer from './renderers/ChartRenderer'
import { DATA_LOGISTICA, DATA_CIBERSEGURIDAD, DATA_FARMACEUTICA } from '@/lib/data'

var dataMap = {
  logistica: DATA_LOGISTICA,
  ciberseguridad: DATA_CIBERSEGURIDAD,
  farmaceutica: DATA_FARMACEUTICA
}

var MapRenderer = dynamic(function () {
  return import('./renderers/MapRenderer')
}, { ssr: false, loading: function() { return <div style={{color:'#888', padding:'40px'}}>Cargando mapa...</div> } })

var styles = {
  dashboard: {
    display: 'block',
    width: '100vw',
    height: '100vh',
    position: 'relative'
  },
  mainContainer: {
    position: 'absolute',
    top: '48px',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  }
}

export default function Dashboard({
  userAddress,
  userBalance,
  currentDemo,
  isCoordinating,
  coordinationComplete,
  simulatedDonationTotal,
  taskStatus,
  statusMsg,
  coordinationHash,
  verifyDisabled,
  coordDisabled,
  coordBtnText,
  onDisconnect,
  onDemoChange,
  onStartCoordination,
  onVerify,
  onDonate
}) {
  var demoData = dataMap[currentDemo]

  return (
    <div id="dashboard" style={styles.dashboard}>
      <TopBar
        userAddress={userAddress}
        userBalance={userBalance}
        onDisconnect={onDisconnect}
      />

      <DemoSelector
        currentDemo={currentDemo}
        onDemoChange={onDemoChange}
      />

      <div id="main-container" style={styles.mainContainer}>
        {currentDemo === 'logistica' && (
          <MapRenderer
            demoData={demoData}
            coordinationComplete={coordinationComplete}
          />
        )}
        {currentDemo === 'ciberseguridad' && (
          <CardsRenderer demoData={demoData} />
        )}
        {currentDemo === 'farmaceutica' && (
          <ChartRenderer demoData={demoData} />
        )}
      </div>

      <DonationPanel
        simulatedDonationTotal={simulatedDonationTotal}
        onDonate={onDonate}
      />

      <ControlPanel
        taskStatus={taskStatus}
        statusMsg={statusMsg}
        coordinationHash={coordinationHash}
        coordDisabled={coordDisabled}
        coordBtnText={coordBtnText}
        verifyDisabled={verifyDisabled}
        onStartCoordination={onStartCoordination}
        onVerify={onVerify}
      />
    </div>
  )
}
