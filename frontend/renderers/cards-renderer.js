// cards-renderer.js — Grid de tarjetas para demo de Ciberseguridad
function initCardsRenderer() {
    var container = document.getElementById('main-container');
    var endpoints = window._demoData ? window._demoData.endpoints : [];
    var agentes = window._demoData ? window._demoData.agentes : [];

    var html = '<div style="padding:24px;max-width:1000px;margin:0 auto;">';
    html += '<h3 style="color:#00ff88;margin-bottom:8px;">Agentes de IA Activos</h3>';
    html += '<div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;">';
    agentes.forEach(function(a) {
        html += '<div style="background:rgba(0,255,136,0.08);border:1px solid #00ff88;border-radius:10px;padding:12px 16px;flex:1;min-width:180px;">';
        html += '<div style="color:#00ff88;font-weight:bold;font-size:14px;">' + a.id + '</div>';
        html += '<div style="color:#ccc;font-size:12px;">' + a.nombre + ' v' + a.version + '</div>';
        html += '<div style="color:#888;font-size:11px;margin-top:4px;">' + a.accion + '</div>';
        html += '</div>';
    });
    html += '</div>';

    html += '<h3 style="color:#00ff88;margin-bottom:8px;">Endpoints Auditados</h3>';
    html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">';
    endpoints.forEach(function(e) {
        var isSafe = e.status === 'seguro';
        var borderColor = isSafe ? '#00ff88' : '#ff4477';
        var bgColor = isSafe ? 'rgba(0,255,136,0.05)' : 'rgba(255,68,119,0.08)';
        html += '<div style="background:' + bgColor + ';border:1px solid ' + borderColor + ';border-radius:10px;padding:16px;">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">';
        html += '<span style="background:' + borderColor + ';color:#0a0a0f;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:bold;">' + e.method + '</span>';
        html += '<span style="color:' + borderColor + ';font-size:12px;font-weight:bold;">' + (isSafe ? 'SEGURO' : 'VULNERABLE') + '</span>';
        html += '</div>';
        html += '<div style="color:#e0e0e0;font-size:12px;word-break:break-all;">' + e.url + '</div>';
        if (e.vulnerabilidad) {
            html += '<div style="color:#ff4477;font-size:11px;margin-top:6px;">⚠ ' + e.vulnerabilidad + '</div>';
        }
        html += '</div>';
    });
    html += '</div></div>';

    container.innerHTML = html;
}

function updateCards(endpoints) {
    initCardsRenderer();
}

function destroyCardsRenderer() {
    document.getElementById('main-container').innerHTML = '';
}
