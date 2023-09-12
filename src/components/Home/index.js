import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import LogoTitle from '../../assets/images/logo-c-down.png'
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Logo'
import Particle from './Particle'
import Loader from 'react-loaders'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const nameArray = ['h', 'a', 'i', 't', 'a', 'n', 'y', 'a']
  const jobArray = ['C', 'S', ' ', 'S', 't', 'u', 'd', 'e', 'n', 't', '.']

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <img src={LogoTitle} alt="developer1" />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={15}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={22}
            />
          </h1>
          <h2>Machine Learning Engineer & Data Scientist</h2>
          <Link to="/contact" className="flat-button">
            CONTACT ME
          </Link>
        </div>
        <Logo />
      </div>
      <Loader type="pacman" />
      <Particle />
    </>
  )
}

export default Home
