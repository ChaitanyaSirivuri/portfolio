import { useEffect, useState, useCallback, useRef } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import CardComponent from './Cards'
import './index.scss'

const Blogs = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [activeCard, setActiveCard] = useState(null)
  const [cardState, setCardState] = useState('idle')
  const hiddenCardRef = useRef(null)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (cardState !== 'idle') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [cardState])

  const data = [
    { title: 'Home', category: 'LLMs' },
    { title: 'College', category: 'VLMs' },
    { title: 'Project', category: 'LLMs' },
    { title: 'Design', category: 'VLMs' },
    { title: 'Work', category: 'LLMs' },
  ]
  const displayData = [...data, ...data]

  const handleCardClick = useCallback((cardData, rect, cardIndex, element) => {
    if (cardState !== 'idle' || activeCard) return
    element.style.visibility = 'hidden'
    hiddenCardRef.current = element
    setActiveCard({ data: cardData, rect, cardIndex })
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCardState('popped')
      })
    })
  }, [cardState, activeCard])

  const handleOverlayCardClick = useCallback(() => {
    if (cardState === 'popped') {
      setCardState('expanded')
    }
  }, [cardState])

  const restoreFlowCard = useCallback(() => {
    if (hiddenCardRef.current) {
      hiddenCardRef.current.style.visibility = ''
      hiddenCardRef.current = null
    }
  }, [])

  const triggerClose = useCallback(() => {
    if (cardState === 'idle' || cardState === 'closing') return
    setCardState('closing')
    setTimeout(() => {
      restoreFlowCard()
      setCardState('idle')
      setActiveCard(null)
    }, 700)
  }, [cardState, restoreFlowCard])

  const handleClose = useCallback((e) => {
    e.stopPropagation()
    triggerClose()
  }, [triggerClose])

  const handleBackdropClick = useCallback(() => {
    triggerClose()
  }, [triggerClose])

  const isFlowPaused = cardState !== 'idle'

  const renderRow = (prefix, directionClass) => (
    <div className={`marquee-row ${directionClass}`}>
      <div className="marquee-content">
        {displayData.map((item, index) => (
          <CardComponent
            key={`${prefix}1-${index}`}
            data={item}
            cardIndex={index}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <div className="marquee-content" aria-hidden="true">
        {displayData.map((item, index) => (
          <CardComponent
            key={`${prefix}2-${index}`}
            data={item}
            cardIndex={index}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  )

  return (
    <>
      <div className={`container blogs-page ${isFlowPaused ? 'flow-paused' : ''}`}>
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
            {renderRow('a', 'left')}
            {renderRow('b', 'right')}
            {renderRow('c', 'left marquee-third')}
            {renderRow('d', 'right marquee-fourth')}
            {renderRow('e', 'left marquee-fifth')}
          </div>
        </div>
      </div>

      {activeCard && (
        <div
          className={`blog-backdrop ${cardState}`}
          onClick={handleBackdropClick}
        />
      )}

      {activeCard && (
        <div
          className={`blog-card-overlay ${cardState}`}
          style={{
            '--origin-x': `${activeCard.rect.left + activeCard.rect.width / 2}px`,
            '--origin-y': `${activeCard.rect.top + activeCard.rect.height / 2}px`,
            '--origin-w': `${activeCard.rect.width}px`,
            '--origin-h': `${activeCard.rect.height}px`,
          }}
          onClick={handleOverlayCardClick}
        >
          <div className="card-flipper">
            <div className="card-front">
              <CardComponent
                data={activeCard.data}
                cardIndex={activeCard.cardIndex}
                isOverlay
              />
            </div>
            <div className="card-back">
              <button className="close-btn" onClick={handleClose}>
                <span className="close-icon"></span>
              </button>
              <div className="card-back-inner">
              <article className="blog-article">
                <h1>{activeCard.data.title}</h1>
                <div className="article-meta">
                  <span>{activeCard.data.category}</span>
                  <span className="meta-dot">·</span>
                  <span>March 6, 2026</span>
                  <span className="meta-dot">·</span>
                  <span>5 min read</span>
                </div>
                <p>
                  The rapid advancement of artificial intelligence has opened new frontiers
                  in how we interact with technology. From natural language processing to
                  computer vision, the capabilities of modern AI systems continue to expand
                  at an unprecedented pace, reshaping industries and redefining what's possible.
                </p>
                <h2>The Evolution of Language Models</h2>
                <p>
                  Large Language Models have undergone a remarkable transformation over the
                  past few years. What started as simple pattern matching has evolved into
                  sophisticated systems capable of reasoning, coding, and creative expression.
                  These models now serve as the backbone of countless applications, from
                  automated customer service to advanced research tools.
                </p>
                <p>
                  The key breakthrough came with the introduction of transformer architectures,
                  which enabled models to process and understand context in ways that were
                  previously impossible. This architectural innovation, combined with massive
                  scaling of both data and compute, has led to models that can engage in
                  nuanced conversations and tackle complex problem-solving tasks.
                </p>
                <h2>Practical Applications</h2>
                <p>
                  Today, these technologies are being deployed across diverse domains. In
                  healthcare, AI assists in diagnosis and drug discovery. In education,
                  personalized learning experiences adapt to each student's needs. In
                  creative fields, AI serves as a collaborative partner, augmenting human
                  creativity rather than replacing it.
                </p>
                <h2>Looking Forward</h2>
                <p>
                  As we continue to push the boundaries of what AI can achieve, the focus
                  is shifting from pure capability to responsible deployment. Ensuring that
                  these powerful tools are used ethically and equitably remains one of the
                  most important challenges of our time. The future promises even more
                  remarkable advances, but it's up to us to guide their development wisely.
                </p>
              </article>
              </div>
            </div>
          </div>
        </div>
      )}

      <Loader type="pacman" />
    </>
  )
}

export default Blogs
