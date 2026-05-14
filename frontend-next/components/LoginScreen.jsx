'use client'

import { useState } from 'react'

var styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0f'
  },
  title: {
    fontSize: '56px',
    color: '#00ff88',
    fontWeight: 'bold',
    textShadow: '0 0 30px rgba(0,255,136,0.6), 0 0 60px rgba(0,255,136,0.3)',
    animation: 'loginPulse 3s ease-in-out infinite'
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    marginTop: '16px'
  },
  sep: {
    width: '300px',
    height: '1px',
    background: '#222',
    margin: '32px auto'
  },
  button: {
    background: 'linear-gradient(135deg, #00ff88, #00cc66)',
    color: '#0a0a0f',
    border: 'none',
    padding: '16px 48px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '12px',
    cursor: 'pointer',
    fontFamily: "'Courier New', monospace",
    transition: 'all 0.3s'
  },
  error: {
    color: '#ff4477',
    fontSize: '13px',
    marginTop: '16px',
    textAlign: 'center',
    maxWidth: '400px'
  },
  footer: {
    position: 'absolute',
    bottom: '24px',
    fontSize: '11px',
    color: '#444'
  }
}

export default function LoginScreen({ onConnect }) {
  var [error, setError] = useState('')
  var [connecting, setConnecting] = useState(false)

  async function handleClick() {
    setConnecting(true)
    setError('')
    var errMsg = await onConnect()
    if (errMsg) {
      setError(errMsg)
    }
    setConnecting(false)
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛡️ MONAD NEXUS</h1>
      <p style={styles.subtitle}>Conecta tu wallet para acceder al sistema</p>
      <div style={styles.sep}></div>
      <button
        style={styles.button}
        onClick={handleClick}
        disabled={connecting}
        onMouseEnter={function (e) {
          e.target.style.transform = 'scale(1.05)'
          e.target.style.boxShadow = '0 0 24px rgba(0,255,136,0.5)'
        }}
        onMouseLeave={function (e) {
          e.target.style.transform = 'scale(1)'
          e.target.style.boxShadow = 'none'
        }}
      >
        {connecting ? 'CONECTANDO...' : '🔌 Conectar Wallet'}
      </button>
      {error && (
        <div
          style={styles.error}
          dangerouslySetInnerHTML={{ __html: error }}
        />
      )}
      <div style={styles.footer}>Monad Testnet — Chain ID 10143</div>
    </div>
  )
}
