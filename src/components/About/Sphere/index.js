import React, { useEffect } from 'react'
import './index.scss'

// Importing TagCloud package
import TagCloud from 'TagCloud'

const Sphere = () => {
  // Function to set the sphere radius based on screen width
  const setSphereRadius = () => {
    const container = '.tagcloud'
    const texts = [
      'Python',
      'R',
      'HTML',
      'CSS',
      'Java',
      'Streamlit',
      'Numpy',
      'Pandas',
      'Tensorflow',
      'Matplotlib',
      'ScikitLearn',
      'Keras',
      'LightGBM',
      'MySql',
      'GIT',
      'Github',
      'Flask',
      'Linux',
      'LaTex',
    ]

    const options = {
      radius: window.innerWidth <= 768 ? 120 : 275,
      maxSpeed: 'fast',
      initSpeed: 'fast',
      keep: false,
    }

    // Remove existing sphere
    const existingSphere = document.querySelector(container)
    if (existingSphere) {
      existingSphere.innerHTML = ''
    }

    TagCloud(container, texts, options)
  }

  // Debounce function to delay execution of setSphereRadius
  const debounce = (func, delay) => {
    let timeout
    return () => {
      clearTimeout(timeout)
      timeout = setTimeout(func, delay)
    }
  }

  // Run the setSphereRadius function on component mount and window resize with debounce
  useEffect(() => {
    setSphereRadius()

    const debouncedSetSphereRadius = debounce(setSphereRadius, 300) // Adjust the delay as needed

    window.addEventListener('resize', debouncedSetSphereRadius)

    return () => {
      window.removeEventListener('resize', debouncedSetSphereRadius)
    }
  }, [])

  return (
    <>
      <div className="Sphere">
        <span className="tagcloud"></span>
      </div>
    </>
  )
}

export default Sphere
