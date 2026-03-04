import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import CardComponent from './Cards/CardComponent'
import './index.scss'

const Blogs = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  const data = [
    { title: 'Home', subtitle: 'Welcome to my portfolio', footer: 'Explore ', updated: '1hr' },
    { title: 'College', subtitle: 'Welcome to my portfolio', footer: 'Explore ', updated: '1hr' },
    { title: 'Project', subtitle: 'Welcome to my portfolio', footer: 'Explore ', updated: '1hr' },
    { title: 'Design', subtitle: 'Welcome to my portfolio', footer: 'Explore ', updated: '1hr' },
    { title: 'Work', subtitle: 'Welcome to my portfolio', footer: 'Explore ', updated: '1hr' },
  ]
  // Provide enough items so it exceeds viewport width generously.
  const displayData = [...data, ...data, ...data, ...data]

  return (
    <>
      <div className="container blogs-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['B', 'l', 'o', 'g', 's']}
              idx={15}
            />
          </h1>
        </div>
        <div className="cards-container">
          <div className="isometric-grid">
            <div className="marquee-row left">
              <div className="marquee-content">
                {displayData.map((item, index) => (
                  <CardComponent key={`a1-${index}`} data={item} />
                ))}
              </div>
              <div className="marquee-content" aria-hidden="true">
                {displayData.map((item, index) => (
                  <CardComponent key={`a2-${index}`} data={item} />
                ))}
              </div>
            </div>

            <div className="marquee-row right">
              <div className="marquee-content">
                {displayData.map((item, index) => (
                  <CardComponent key={`b1-${index}`} data={item} />
                ))}
              </div>
              <div className="marquee-content" aria-hidden="true">
                {displayData.map((item, index) => (
                  <CardComponent key={`b2-${index}`} data={item} />
                ))}
              </div>
            </div>

            <div className="marquee-row left marquee-third">
              <div className="marquee-content">
                {displayData.map((item, index) => (
                  <CardComponent key={`c1-${index}`} data={item} />
                ))}
              </div>
              <div className="marquee-content" aria-hidden="true">
                {displayData.map((item, index) => (
                  <CardComponent key={`c2-${index}`} data={item} />
                ))}
              </div>
            </div>

            <div className="marquee-row right marquee-fourth">
              <div className="marquee-content">
                {displayData.map((item, index) => (
                  <CardComponent key={`d1-${index}`} data={item} />
                ))}
              </div>
              <div className="marquee-content" aria-hidden="true">
                {displayData.map((item, index) => (
                  <CardComponent key={`d2-${index}`} data={item} />
                ))}
              </div>
            </div>

            <div className="marquee-row left marquee-fifth">
              <div className="marquee-content">
                {displayData.map((item, index) => (
                  <CardComponent key={`e1-${index}`} data={item} />
                ))}
              </div>
              <div className="marquee-content" aria-hidden="true">
                {displayData.map((item, index) => (
                  <CardComponent key={`e2-${index}`} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Blogs