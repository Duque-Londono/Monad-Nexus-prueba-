// chart-renderer.js — Barras de progreso horizontales para demo Farmacéutica
function initChartRenderer() {
    var container = document.getElementById('main-container');
    var moleculas = window._demoData ? window._demoData.moleculas : [];

    var html = '<div style="padding:24px;max-width:800px;margin:0 auto;">';
    html += '<h3 style="color:#00ff88;margin-bottom:20px;">Efectividad de Mol&eacute;culas</h3>';

    var sorted = moleculas.slice().sort(function(a, b) { return b.efectividad - a.efectividad; });

    sorted.forEach(function(m) {
        var pct = m.efectividad;
        var r = Math.round(255 - (pct / 100) * 255);
        var g = Math.round((pct / 100) * 255);
        var barColor = 'rgb(' + r + ',' + g + ',50)';
        var barWidth = pct + '%';

        html += '<div style="margin-bottom:18px;">';
        html += '<div style="display:flex;justify-content:space-between;margin-bottom:4px;">';
        html += '<span style="color:#e0e0e0;font-size:13px;">' + m.nombre + '</span>';
        html += '<span style="color:#00ff88;font-size:13px;font-weight:bold;">' + pct + '%</span>';
        html += '</div>';
        html += '<div style="width:100%;height:22px;background:#1a1a24;border-radius:6px;overflow:hidden;">';
        html += '<div style="width:' + barWidth + ';height:100%;background:' + barColor + ';border-radius:6px;transition:width 0.6s ease;display:flex;align-items:center;padding-left:8px;">';
        html += '<span style="color:#0a0a0f;font-size:11px;font-weight:bold;">' + m.interacciones + ' interacciones</span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    });

    html += '</div>';
    container.innerHTML = html;
}

function updateChart(moleculas) {
    initChartRenderer();
}

function destroyChartRenderer() {
    document.getElementById('main-container').innerHTML = '';
}
