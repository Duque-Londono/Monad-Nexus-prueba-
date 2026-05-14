'use client'

var styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    background: 'rgba(10,10,15,0.95)',
    borderBottom: '1px solid #222'
  },
  title: {
    color: '#00ff88',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  walletInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '12px',
    color: '#888'
  },
  addr: {
    color: '#00ff88',
    fontWeight: 'bold'
  },
  balance: {
    color: '#00ff88'
  },
  network: {
    background: '#222',
    padding: '2px 8px',
    borderRadius: '4px',
    color: '#00ff88',
    fontSize: '10px'
  },
  disconnectBtn: {
    background: 'transparent',
    border: '1px solid #ff4477',
    color: '#ff4477',
    padding: '4px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '11px',
    fontFamily: "'Courier New', monospace"
  }
}

export default function TopBar({ userAddress, userBalance, onDisconnect }) {
  var shortAddr = userAddress
    ? userAddress.substring(0, 6) + '...' + userAddress.substring(38)
    : '—'

  return (
    <div style={styles.container}>
      <div style={styles.title}>🛡️ Monad Nexus</div>
      <div style={styles.walletInfo}>
        <span>Wallet:</span>
        <span style={styles.addr}>{shortAddr}</span>
        <span>Saldo:</span>
        <span style={styles.balance}>{userBalance} MON</span>
        <span style={styles.network}>Monad Testnet</span>
        <button style={styles.disconnectBtn} onClick={onDisconnect}>
          Desconectar
        </button>
      </div>
    </div>
  )
}
