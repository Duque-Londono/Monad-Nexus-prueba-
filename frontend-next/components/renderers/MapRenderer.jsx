'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapRenderer({ demoData, coordinationComplete }) {
  var mapContainerRef = useRef(null)
  var overlayRef = useRef(null)
  var mapInstanceRef = useRef(null)
  var familyMarkersRef = useRef([])
  var centerMarkersRef = useRef([])
  var hasDrawnRef = useRef(false)

  useEffect(function () {
    if (typeof window === 'undefined') return
    var container = mapContainerRef.current
    if (!container) return

    mapInstanceRef.current = L.map(container, { zoomControl: false }).setView([5.691, -76.659], 13)

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; Stadia Maps, &copy; OpenMapTiles &copy; OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current)

    var families = (demoData && demoData.familias) || []
    var centers = (demoData && demoData.centros) || []

    families.forEach(function (f) {
      var marker = L.circleMarker([f.lat / 1000, f.lng / 1000], {
        radius: 5 + (f.personas * 0.8),
        color: '#ff2244',
        fillColor: '#ff2244',
        fillOpacity: 0.85,
        className: 'pulse'
      }).addTo(mapInstanceRef.current)
      marker.bindPopup('Familia #' + f.id + '<br>Personas: ' + f.personas)
      familyMarkersRef.current.push(marker)
    })

    centers.forEach(function (c) {
      var icon = L.divIcon({
        className: 'center-icon',
        html: '<div style="background:#2244ff;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:bold;border:2px solid #fff;">' + c.nombre.charAt(0) + '</div>',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      })
      var marker = L.marker([c.lat / 1000, c.lng / 1000], { icon: icon }).addTo(mapInstanceRef.current)
      marker.bindPopup(c.nombre)
      centerMarkersRef.current.push(marker)
    })

    setTimeout(function () {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize()
    }, 300)

    return function () {
      familyMarkersRef.current.forEach(function (m) {
        if (mapInstanceRef.current) mapInstanceRef.current.removeLayer(m)
      })
      centerMarkersRef.current.forEach(function (m) {
        if (mapInstanceRef.current) mapInstanceRef.current.removeLayer(m)
      })
      familyMarkersRef.current = []
      centerMarkersRef.current = []
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      hasDrawnRef.current = false
    }
  }, [demoData])

  useEffect(function () {
    if (coordinationComplete && !hasDrawnRef.current && demoData) {
      hasDrawnRef.current = true
      drawGreenLines(demoData.familias || [], demoData.centros || [])
    }
    if (!coordinationComplete) {
      hasDrawnRef.current = false
    }
  }, [coordinationComplete, demoData])

  function drawGreenLines(families, centers) {
    var canvas = overlayRef.current
    if (canvas) {
      var ctx = canvas.getContext('2d')
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    if (!mapInstanceRef.current || families.length === 0 || centers.length === 0) return
    if (!canvas) return

    var ctx2 = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    families.forEach(function (f) {
      var best = centers[0]
      var minD = Infinity
      centers.forEach(function (c) {
        var d = Math.hypot(f.lat - c.lat, f.lng - c.lng)
        if (d < minD) { minD = d; best = c }
      })

      var from = mapInstanceRef.current.latLngToContainerPoint([f.lat / 1000, f.lng / 1000])
      var to = mapInstanceRef.current.latLngToContainerPoint([best.lat / 1000, best.lng / 1000])

      var gradient = ctx2.createLinearGradient(from.x, from.y, to.x, to.y)
      gradient.addColorStop(0, 'rgba(255,34,68,0.6)')
      gradient.addColorStop(1, 'rgba(0,255,136,0.9)')

      ctx2.strokeStyle = gradient
      ctx2.lineWidth = 2
      ctx2.beginPath()
      ctx2.moveTo(from.x, from.y)
      ctx2.lineTo(to.x, to.y)
      ctx2.stroke()

      ctx2.shadowColor = '#00ff88'
      ctx2.shadowBlur = 10
      ctx2.fillStyle = '#00ff88'
      ctx2.beginPath()
      ctx2.arc(to.x, to.y, 5, 0, Math.PI * 2)
      ctx2.fill()
      ctx2.shadowBlur = 0
    })
  }

  return (
    <>
      <div ref={mapContainerRef} id="demo-map" style={{ width: '100%', height: '100%' }} />
      <canvas
        ref={overlayRef}
        id="overlay"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}
      />
    </>
  )
}
