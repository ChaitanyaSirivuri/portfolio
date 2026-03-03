import { useRef } from 'react'
import Loader from 'react-loaders'
import CardComponent from '../Cards/CardComponent'
import './index.scss'

const Blogs = () => {
  const container1Ref = useRef(null)
  const container2Ref = useRef(null)

  const scrollInterval1 = useRef(null)
  const scrollInterval2 = useRef(null)

  const data = [
    { title:'Home', subtitle:'Welcome to my portfolio', footer:'Explore ', updated:'1hr' },
    { title:'College', subtitle:'Welcome to my portfolio', footer:'Explore ', updated:'1hr' },
    { title:'Project', subtitle:'Welcome to my portfolio', footer:'Explore ', updated:'1hr' },
    { title:'Design', subtitle:'Welcome to my portfolio', footer:'Explore ', updated:'1hr' },
    { title:'Work', subtitle:'Welcome to my portfolio', footer:'Explore ', updated:'1hr' },
  ]

  const data2 = [...data]

  const startScroll = (ref, intervalRef, direction) => {
    stopScroll(intervalRef)

    intervalRef.current = setInterval(() => {
      if (!ref.current) return

      ref.current.scrollLeft += direction * 4

      if (
        ref.current.scrollLeft <= 0 ||
        ref.current.scrollLeft + ref.current.clientWidth >=
          ref.current.scrollWidth
      ) {
        stopScroll(intervalRef)
      }
    }, 10)
  }

  const stopScroll = (intervalRef) => {
    clearInterval(intervalRef.current)
  }

  return (
    <>
      <div className="container blogs-page">
        <div>

          {/* ===== Container 1 ===== */}
          <div className="carousel-wrapper">
            <div
              className="hover-zone left"
              onMouseEnter={() => startScroll(container1Ref, scrollInterval1, -1)}
              onMouseLeave={() => stopScroll(scrollInterval1)}
            />

            <div className="Container1" ref={container1Ref}>
              {data.map((item, index) => (
                <CardComponent key={index} data={item} />
              ))}
            </div>

            <div
              className="hover-zone right"
              onMouseEnter={() => startScroll(container1Ref, scrollInterval1, 1)}
              onMouseLeave={() => stopScroll(scrollInterval1)}
            />
          </div>

          {/* ===== Container 2 ===== */}
          <div className="carousel-wrapper second">
            <div
              className="hover-zone left"
              onMouseEnter={() => startScroll(container2Ref, scrollInterval2, -1)}
              onMouseLeave={() => stopScroll(scrollInterval2)}
            />

            <div className="Container2" ref={container2Ref}>
              {data2.map((item, index) => (
                <CardComponent key={index} data={item} />
              ))}
            </div>

            <div
              className="hover-zone right"
              onMouseEnter={() => startScroll(container2Ref, scrollInterval2, 1)}
              onMouseLeave={() => stopScroll(scrollInterval2)}
            />
          </div>

        </div>
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Blogs