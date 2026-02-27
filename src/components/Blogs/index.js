import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Loader from 'react-loaders'

const Blogs = () => {
    const [letterClass, setLetterClass] = useState('text-animate')

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
            <div className="container blogs-page">
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={['B', 'l', 'o', 'g', 's']}
                            idx={15}
                        />
                    </h1>
                    <p>
                        This page is currently under development. Stay tuned for insightful articles on machine learning, data science, and my research journey!
                    </p>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Blogs
