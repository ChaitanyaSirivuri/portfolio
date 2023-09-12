import React, { useState, useEffect, useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

const Particle = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  const particlesInit = useCallback(async (engine) => {
    console.log(engine)
    await loadSlim(engine)
    setIsLoaded(true) // Mark particles as loaded
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true) // Simulate a 1-second delay
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return isLoaded ? (
    <div className={`particle-container ${isLoaded ? 'fade-in' : ''}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: 'black',
            },
          },
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'grab',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#ffffff',
            },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 50,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  ) : null
}

export default Particle
