'use client'

import { DEMOS } from '@/lib/config'

var styles = {
  container: {
    position: 'absolute',
    top: '56px',
    left: '20px',
    zIndex: 50,
    background: 'rgba(10,10,15,0.92)',
    border: '1px solid #333',
    borderRadius: '12px',
    padding: '16px',
    minWidth: '220px',
    backdropFilter: 'blur(10px)'
  },
  label: {
    fontSize: '11px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    display: 'block',
    marginBottom: '8px'
  },
  select: {
    width: '100%',
    background: '#1a1a24',
    color: '#e0e0e0',
    border: '1px solid #333',
    padding: '8px 12px',
    borderRadius: '8px',
    fontFamily: "'Courier New', monospace",
    fontSize: '13px',
    cursor: 'pointer',
    outline: 'none'
  }
}

export default function DemoSelector({ currentDemo, onDemoChange }) {
  function handleChange(e) {
    onDemoChange(e.target.value)
  }

  return (
    <div style={styles.container}>
      <label style={styles.label}>Demo</label>
      <select
        style={styles.select}
        value={currentDemo}
        onChange={handleChange}
      >
        {Object.keys(DEMOS).map(function (key) {
          return (
            <option key={key} value={key}>
              {DEMOS[key].icon} {DEMOS[key].title}
            </option>
          )
        })}
      </select>
    </div>
  )
}
