import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../AuthProvider.component'
import { useNavigate, Link } from 'react-router-dom'


function ShowProject () {
  const [projects, setProjects] = useState([])
  const { auth, setAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    // URL
    const backendURL = 'http://localhost:8000'
    axios.get(`${backendURL}/projects/detail/view_my`, {
      params: {
        id: auth.username
      },
      headers: {
        Authorization: "Bearer " + auth.accessToken
      }
    })
      .then(response => {
        setProjects(response.data)
        console.log("test:", response.data[0].title)
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  const handleReturn = () => {
    navigate('/profile')
  }

  function handleDelteProject (projectID) {
    const data = {
      id: projectID
    }
    const config = {
      headers: {
        Authorization: "Bearer " + auth.accessToken
      }
    }
    axios.post(`http://localhost:8000/projects/delete/`, data, config)
      .then((response) => {
        console.log(response.data)
        navigate('/show_project')
        setProjects(projects.filter(project => project.id !== projectID))
      })
      .catch((error) => {
        setAuth({ success: false })
        if (error.response) {
          console.error('Status Code:', error.response.status)

          console.error('Data:', error.response.data)
          console.error('Response Header:', error.response.headers)
        } else {
          console.error('Error:', error.message)
        }
      })
  }

  return (
    <div className="auth-inner-large">
      <h1>Projects List</h1>
      <ul>
        {Array.isArray(projects) && projects.map(project => (
          <li className="show-project-item" key={project.id}>
            <Link to={`/project/${project.id}`}>{project.title}</Link>
            <div className="project-button-container">
              <button className="project-button" onClick={() => handleDelteProject(project.id)}>delete project</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleReturn}>Return</button>
    </div>
  )
}

export default ShowProject
