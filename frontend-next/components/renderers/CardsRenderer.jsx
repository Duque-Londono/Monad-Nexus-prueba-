'use client'

export default function CardsRenderer({ demoData }) {
  if (!demoData) return null

  var endpoints = demoData.endpoints || []
  var agentes = demoData.agentes || []

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <h3 style={{ color: '#00ff88', marginBottom: '8px' }}>Agentes de IA Activos</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {agentes.map(function (a) {
          return (
            <div
              key={a.id}
              style={{
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid #00ff88',
                borderRadius: '10px',
                padding: '12px 16px',
                flex: '1',
                minWidth: '180px'
              }}
            >
              <div style={{ color: '#00ff88', fontWeight: 'bold', fontSize: '14px' }}>{a.id}</div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>{a.nombre} v{a.version}</div>
              <div style={{ color: '#888', fontSize: '11px', marginTop: '4px' }}>{a.accion}</div>
            </div>
          )
        })}
      </div>

      <h3 style={{ color: '#00ff88', marginBottom: '8px' }}>Endpoints Auditados</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
        {endpoints.map(function (e, idx) {
          var isSafe = e.status === 'seguro'
          var borderColor = isSafe ? '#00ff88' : '#ff4477'
          var bgColor = isSafe ? 'rgba(0,255,136,0.05)' : 'rgba(255,68,119,0.08)'
          return (
            <div
              key={idx}
              style={{
                background: bgColor,
                border: '1px solid ' + borderColor,
                borderRadius: '10px',
                padding: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span
                  style={{
                    background: borderColor,
                    color: '#0a0a0f',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}
                >
                  {e.method}
                </span>
                <span style={{ color: borderColor, fontSize: '12px', fontWeight: 'bold' }}>
                  {isSafe ? 'SEGURO' : 'VULNERABLE'}
                </span>
              </div>
              <div style={{ color: '#e0e0e0', fontSize: '12px', wordBreak: 'break-all' }}>{e.url}</div>
              {e.vulnerabilidad && (
                <div style={{ color: '#ff4477', fontSize: '11px', marginTop: '6px' }}>
                  ⚠ {e.vulnerabilidad}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
