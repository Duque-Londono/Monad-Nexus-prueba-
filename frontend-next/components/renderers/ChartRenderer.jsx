'use client'

export default function ChartRenderer({ demoData }) {
  if (!demoData) return null

  var moleculas = demoData.moleculas || []
  var sorted = moleculas.slice().sort(function (a, b) {
    return b.efectividad - a.efectividad
  })

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h3 style={{ color: '#00ff88', marginBottom: '20px' }}>
        Efectividad de Moléculas
      </h3>

      {sorted.map(function (m, idx) {
        var pct = m.efectividad
        var r = Math.round(255 - (pct / 100) * 255)
        var g = Math.round((pct / 100) * 255)
        var barColor = 'rgb(' + r + ',' + g + ',50)'
        var barWidth = pct + '%'

        return (
          <div key={idx} style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: '#e0e0e0', fontSize: '13px' }}>{m.nombre}</span>
              <span style={{ color: '#00ff88', fontSize: '13px', fontWeight: 'bold' }}>{pct}%</span>
            </div>
            <div style={{ width: '100%', height: '22px', background: '#1a1a24', borderRadius: '6px', overflow: 'hidden' }}>
              <div
                style={{
                  width: barWidth,
                  height: '100%',
                  background: barColor,
                  borderRadius: '6px',
                  transition: 'width 0.6s ease',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '8px'
                }}
              >
                <span style={{ color: '#0a0a0f', fontSize: '11px', fontWeight: 'bold' }}>
                  {m.interacciones} interacciones
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
