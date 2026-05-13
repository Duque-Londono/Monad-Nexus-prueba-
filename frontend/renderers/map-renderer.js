// map-renderer.js — Mapa Leaflet para demo de Logística Humanitaria
var mapInstance = null;
var familyMarkers = [];
var centerMarkers = [];
var linePolylines = [];

function initMapRenderer() {
    var container = document.getElementById('main-container');
    container.innerHTML = '<div id="demo-map" style="width:100%;height:100%;"></div><canvas id="overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;pointer-events:none;"></canvas>';

    if (typeof L === 'undefined') {
        container.innerHTML = '<p style="color:#ff4477;padding:40px;">Error: Leaflet no cargado. Verifica tu conexi&oacute;n a Internet.</p>';
        return;
    }

    mapInstance = L.map('demo-map', { zoomControl: false }).setView([5.691, -76.659], 13);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; Stadia Maps, &copy; OpenMapTiles &copy; OpenStreetMap contributors'
    }).addTo(mapInstance);

    var families = window._demoData ? window._demoData.familias : [];
    var centers = window._demoData ? window._demoData.centros : [];

    families.forEach(function(f) {
        var marker = L.circleMarker([f.lat / 1000, f.lng / 1000], {
            radius: 5 + (f.personas * 0.8),
            color: '#ff2244',
            fillColor: '#ff2244',
            fillOpacity: 0.85,
            className: 'pulse'
        }).addTo(mapInstance);
        marker.bindPopup('Familia #' + f.id + '<br>Personas: ' + f.personas);
        familyMarkers.push(marker);
    });

    centers.forEach(function(c) {
        var icon = L.divIcon({
            className: 'center-icon',
            html: '<div style="background:#2244ff;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:bold;border:2px solid #fff;">' + c.nombre.charAt(0) + '</div>',
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });
        var marker = L.marker([c.lat / 1000, c.lng / 1000], { icon: icon }).addTo(mapInstance);
        marker.bindPopup(c.nombre);
        centerMarkers.push(marker);
    });

    setTimeout(function() {
        mapInstance.invalidateSize();
    }, 300);
}

function drawGreenLines(families, centers) {
    clearLines();
    if (!mapInstance || families.length === 0 || centers.length === 0) return;

    var canvas = document.getElementById('overlay');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    families.forEach(function(f) {
        var best = centers[0], minD = Infinity;
        centers.forEach(function(c) {
            var d = Math.hypot(f.lat - c.lat, f.lng - c.lng);
            if (d < minD) { minD = d; best = c; }
        });

        var from = mapInstance.latLngToContainerPoint([f.lat / 1000, f.lng / 1000]);
        var to = mapInstance.latLngToContainerPoint([best.lat / 1000, best.lng / 1000]);

        var gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, 'rgba(255,34,68,0.6)');
        gradient.addColorStop(1, 'rgba(0,255,136,0.9)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#00ff88';
        ctx.beginPath();
        ctx.arc(to.x, to.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

function clearLines() {
    linePolylines.forEach(function(l) { if (mapInstance) mapInstance.removeLayer(l); });
    linePolylines = [];
    var canvas = document.getElementById('overlay');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function destroyMapRenderer() {
    clearLines();
    familyMarkers.forEach(function(m) { if (mapInstance) mapInstance.removeLayer(m); });
    centerMarkers.forEach(function(m) { if (mapInstance) mapInstance.removeLayer(m); });
    familyMarkers = [];
    centerMarkers = [];
    if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }
}
