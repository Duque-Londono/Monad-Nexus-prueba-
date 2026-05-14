'use client'

import { useEffect, useRef } from 'react'

export default function RainCanvas({ isCoordinating }) {
  var canvasRef = useRef(null)
  var rainIdRef = useRef(null)

  useEffect(function () {
    if (!isCoordinating) {
      if (rainIdRef.current) {
        cancelAnimationFrame(rainIdRef.current)
        rainIdRef.current = null
      }
      return
    }

    var canvas = canvasRef.current
    if (!canvas) return
    var ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    var particles = []
    for (var i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        speed: 2 + Math.random() * 6,
        alpha: 0.2 + Math.random() * 0.5
      })
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (var j = 0; j < particles.length; j++) {
        var p = particles[j]
        p.y += p.speed
        if (p.y > canvas.height) {
          p.y = -10
          p.x = Math.random() * canvas.width
        }
        ctx.fillStyle = 'rgba(255,255,255,' + p.alpha + ')'
        ctx.fillRect(p.x, p.y, 2, 12)
      }
      rainIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    function handleResize() {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    window.addEventListener('resize', handleResize)

    return function () {
      if (rainIdRef.current) {
        cancelAnimationFrame(rainIdRef.current)
        rainIdRef.current = null
      }
      window.removeEventListener('resize', handleResize)
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [isCoordinating])

  return (
    <canvas
      ref={canvasRef}
      id="rain-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 60,
        pointerEvents: 'none',
        display: isCoordinating ? 'block' : 'none'
      }}
    />
  )
}
