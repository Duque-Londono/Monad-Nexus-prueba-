'use client'

var styles = {
  container: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 50,
    background: 'rgba(10,10,15,0.92)',
    border: '1px solid #333',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center',
    minWidth: '420px',
    backdropFilter: 'blur(10px)'
  },
  heading: {
    fontSize: '13px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '8px'
  },
  counter: {
    fontSize: '42px',
    color: '#00ff88',
    margin: '10px 0',
    fontWeight: 'bold'
  },
  button: {
    background: 'linear-gradient(135deg, #00ff88, #00cc66)',
    color: '#0a0a0f',
    border: 'none',
    padding: '15px 40px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '12px',
    cursor: 'pointer',
    margin: '8px',
    fontFamily: "'Courier New', monospace",
    transition: 'all 0.3s'
  },
  dangerButton: {
    background: 'linear-gradient(135deg, #ff4477, #cc2266)',
    color: '#0a0a0f',
    border: 'none',
    padding: '15px 40px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '12px',
    cursor: 'pointer',
    margin: '8px',
    fontFamily: "'Courier New', monospace",
    transition: 'all 0.3s'
  },
  disabled: {
    background: '#444',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
    color: '#0a0a0f',
    border: 'none',
    padding: '15px 40px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '12px',
    margin: '8px',
    fontFamily: "'Courier New', monospace"
  },
  status: {
    fontSize: '11px',
    color: '#00ffcc',
    marginTop: '12px',
    wordBreak: 'break-all'
  }
}

export default function ControlPanel({
  taskStatus,
  statusMsg,
  coordinationHash,
  coordDisabled,
  coordBtnText,
  verifyDisabled,
  onStartCoordination,
  onVerify
}) {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Monad Nexus — DeCompute Coordinativo</h2>
      <div style={styles.counter}>
        {taskStatus.completed} / {taskStatus.total}
      </div>

      {coordDisabled ? (
        <button style={styles.disabled} disabled>
          {coordBtnText}
        </button>
      ) : (
        <button
          style={styles.button}
          onClick={onStartCoordination}
          onMouseEnter={function (e) {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 0 20px rgba(0,255,136,0.5)'
          }}
          onMouseLeave={function (e) {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = 'none'
          }}
        >
          {coordBtnText}
        </button>
      )}

      <button
        style={verifyDisabled ? styles.disabled : styles.dangerButton}
        disabled={verifyDisabled}
        onClick={onVerify}
        onMouseEnter={function (e) {
          if (!verifyDisabled) {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 0 20px rgba(255,68,119,0.5)'
          }
        }}
        onMouseLeave={function (e) {
          if (!verifyDisabled) {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = 'none'
          }
        }}
      >
        VERIFICAR ON-CHAIN
      </button>

      <div style={styles.status}>
        {statusMsg}
        {coordinationHash && (
          <>
            <br />
            <span style={{ fontSize: '10px', color: '#00ffcc' }}>
              {coordinationHash}
            </span>
          </>
        )}
      </div>
    </div>
  )
}
