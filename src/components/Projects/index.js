import { useEffect, useState } from 'react'
import './index.scss'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'

const Projects = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [projects, setProjects] = useState([]) // State to store GitHub projects
  const [loading, setLoading] = useState(true) // State to handle loading

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    // Fetch GitHub repositories
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/ChaitanyaSirivuri/repos'
        )
        const data = await response.json()

        // Filter specific projects by name or other criteria
        const selectedProjects = data.filter((project) =>
          ['rag-from-scratch', 'HerbNet', 'AutoML', 'DrCrop'].includes(
            project.name
          )
        )

        setProjects(selectedProjects) // Store the filtered projects
        setLoading(false) // Set loading to false
      } catch (error) {
        console.error('Error fetching GitHub projects:', error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <>
      <div className="container projects-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['P', 'r', 'o', 'j', 'e', 'c', 't', 's']}
              idx={15}
            />
          </h1>
          <div className="projects-list">
            {loading ? (
              <p>Loading projects...</p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="project-item">
                  <h2>{project.name}</h2>
                  <p>{project.description || 'No description available'}</p>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Projects
