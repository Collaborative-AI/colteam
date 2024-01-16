import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getToken } from '../../utils'


function ProjectDetail ({ match }) {
  const projectId = match.params.id
  const [project, setProject] = useState(null)

  useEffect(() => {
    // URL
    const backendURL = 'http://localhost:8000'
    axios
      .get(`${backendURL}/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        },
      })
      .then((response) => {
        setProject(response.data)
      })
      .catch((error) => console.error('Error fetching project data:', error))
  }, [projectId, getToken()])

  if (!project) {
    // Loading Information
    return <div>Loading...</div>
  }

  return (
    <div className="auth-inner-large">
      <h1>Project Details</h1>
      <h2>Title: {project.title}</h2>
      <p>Description: {project.description}</p>
      {/* Other Information */}
      <Link to="/update_project">
        <button>
          update project
        </button>
      </Link>
    </div>
  )
}

export default ProjectDetail
