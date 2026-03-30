import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Sphere from './Sphere'

import Loader from 'react-loaders'
import MouseTrail from '../MouseTrail'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [showTrail, setShowTrail] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)

    const trailTimeout = setTimeout(() => {
      setShowTrail(true)
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(trailTimeout)
    }
  }, [])
  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'M', 'e']}
              idx={15}
            />
          </h1>
          <p>
            Hi, I'm Chaitanya Sirivuri, data science graduate student at Stony Brook University and Senior
            research assistant at the Center of Excellence in Wireless and Information Technology (CEWIT), who is
            passionate about the exciting world of Large Language Models and Vision Language Models.
            Hailing from a diverse academic background, my insatiable
            curiosity led me to explore the realms of artificial intelligence
            throughout my academic journey.
          </p>
          <p>
            What truly sets me apart is my dedication to applying my knowledge
            in practical ways. I thrive on the creative process of building new
            and innovative projects using Agentic AI, Explainable AI, and LLM projects.
          </p>
          <p>
            In addition to my hands-on projects, I also devotes my free time to
            scholarly pursuits. I actively contribute to the field by writing
            articles and research assistance to my professors, advancing the
            frontiers of machine learning and data science.
          </p>
        </div>
        <Sphere />
      </div>
      <Loader type="pacman" />
      {showTrail && <MouseTrail />}
    </>
  )
}

export default About
