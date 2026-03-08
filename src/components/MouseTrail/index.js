import React, { useEffect, useRef } from 'react'

const MouseTrail = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    let lines = []

    // Physics configuration
    const E = {
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    }

    class Node {
      constructor() {
        this.x = 0
        this.y = 0
        this.vy = 0
        this.vx = 0
      }
    }

    class Line {
      constructor(e) {
        this.spring = e.spring + 0.1 * Math.random() - 0.05
        this.friction = E.friction + 0.01 * Math.random() - 0.005
        this.nodes = []
        for (let i = 0; i < E.size; i++) {
          const t = new Node()
          t.x = pos.x
          t.y = pos.y
          this.nodes.push(t)
        }
      }

      update() {
        let e = this.spring,
          t = this.nodes[0]

        t.vx += (pos.x - t.x) * e
        t.vy += (pos.y - t.y) * e

        for (let i = 0, a = this.nodes.length; i < a; i++) {
          t = this.nodes[i]

          if (i > 0) {
            const n = this.nodes[i - 1]
            t.vx += (n.x - t.x) * e
            t.vy += (n.y - t.y) * e
            t.vx += n.vx * E.dampening
            t.vy += n.vy * E.dampening
          }

          t.vx *= this.friction
          t.vy *= this.friction
          t.x += t.vx
          t.y += t.vy
          e *= E.tension
        }
      }

      draw(ctx) {
        let e = this.nodes[0].x,
          t = this.nodes[0].y,
          a

        ctx.beginPath()
        ctx.moveTo(e, t)

        for (let i = 1, n = this.nodes.length - 2; i < n; i++) {
          const r = this.nodes[i]
          const o = this.nodes[i + 1]
          e = 0.5 * (r.x + o.x)
          t = 0.5 * (r.y + o.y)
          ctx.quadraticCurveTo(r.x, r.y, e, t)
        }

        a = this.nodes[this.nodes.length - 1]
        ctx.quadraticCurveTo(this.nodes[this.nodes.length - 2].x, this.nodes[this.nodes.length - 2].y, a.x, a.y)
        ctx.stroke()
      }
    }

    const onMouseMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        pos.x = e.touches[0].clientX
        pos.y = e.touches[0].clientY
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      lines = []
      for (let i = 0; i < E.trails; i++) {
        lines.push(new Line({ spring: 0.45 + 0.025 * (i / E.trails) }))
      }
      resize()
    }

    const render = () => {
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'

      ctx.strokeStyle = 'rgba(100, 204, 197, 0.4)'
      ctx.lineWidth = 1.2
      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(100, 204, 197, 0.4)'

      for (let i = 0; i < E.trails; i++) {
        lines[i].update()
        lines[i].draw(ctx)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('resize', resize)

    init()
    render()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  )
}

export default MouseTrail
