'use client'

var styles = {
  container: {
    position: 'absolute',
    top: '56px',
    right: '20px',
    zIndex: 50,
    background: 'rgba(10,10,15,0.92)',
    border: '1px solid #00ff88',
    borderRadius: '12px',
    padding: '15px',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    minWidth: '180px'
  },
  label: {
    fontSize: '10px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  amount: {
    fontSize: '20px',
    color: '#00ff88',
    fontWeight: 'bold',
    margin: '6px 0'
  },
  button: {
    background: 'linear-gradient(135deg, #ff4477, #cc2266)',
    color: '#0a0a0f',
    border: 'none',
    padding: '8px 20px',
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Courier New', monospace",
    transition: 'all 0.3s',
    marginTop: '6px'
  }
}

export default function DonationPanel({ simulatedDonationTotal, onDonate }) {
  return (
    <div style={styles.container}>
      <div style={styles.label}>Donaciones</div>
      <div style={styles.amount}>
        {simulatedDonationTotal.toFixed(4)} MON
      </div>
      <button
        style={styles.button}
        onClick={onDonate}
        onMouseEnter={function (e) {
          e.target.style.boxShadow = '0 0 20px rgba(255,68,119,0.5)'
        }}
        onMouseLeave={function (e) {
          e.target.style.boxShadow = 'none'
        }}
      >
        DONAR 0.01 MON
      </button>
    </div>
  )
}
