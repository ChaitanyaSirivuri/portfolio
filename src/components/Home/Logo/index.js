import './index.scss'
import LogoS from '../../../assets/images/logo-c-small.png'
import svgOut from '../../../assets/images/logo-out.png'
import { useRef, useEffect } from 'react'
import gsap from 'gsap-trial'

const Logo = () => {
  const bgRef = useRef()
  const outlineLogoRef = useRef()
  const solidLogoRef = useRef()

  useEffect(() => {
    gsap
      .timeline()
      .to(bgRef.current, {
        duration: 1,
        opacity: 1,
      })
      .from(outlineLogoRef.current, {
        drawSVG: 0,
        duration: 20,
      })

    gsap.fromTo(
      solidLogoRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 2,
        duration: 4,
      }
    )
  }, [])

  return (
    <div className="logo-container" ref={bgRef}>
      <img ref={solidLogoRef} className="solid-logo" src={LogoS} alt="C"></img>
      <img
        ref={outlineLogoRef}
        className="svg-container"
        src={svgOut}
        alt="Cout"
      ></img>
    </div>
  )
}

export default Logo
