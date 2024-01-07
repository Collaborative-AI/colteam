import React from 'react'
import { useState, useContext } from 'react'
import '../../index.css'
import colteam_logo from '../../images/colteam_logo.png'
import AuthContext from '../AuthProvider.component'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const InputItem = ({ name, onChange, value, placeholder }) => {
  return (
    <div className="input-item">
      <label className="input-item-name">{name}</label>
      <input
        type='text'
        className='form-control'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={onChange == null}
      />
    </div>
  )
}


function NewProject () {
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [website, setWebsite] = useState("")

  const { auth, setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  console.log(auth.email)

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    const data = {
      email: auth.email,
      title: projectName,
      description: description,
      website: website
    }
    const config = {
      headers: {
        Authorization: "Bearer " + auth.accessToken
      }
    }

    axios
      .post('http://localhost:8000/projects/create/', data, config)
      .then((response) => {
        console.log(response.data)
        navigate('/show_project')
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
      <div className="create-project-header-container">
        <div>
          <img className="logo" src={colteam_logo} alt="" />
        </div>
        <div className="create-project-title-text">Create a new model repository</div>
        <div className="create-project-subtitle-text">A repository contains all model files, including the revision history.</div>
      </div>
      <InputItem
        name="email"
        value={auth.email}
      />
      <InputItem
        name="Project name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="please input your project name"
      />

      <InputItem
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="please input website"
      />

      <InputItem
        name="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="please write description"
      />

      <div className="create-project-info-text">
        Once your model is created, you can upload your files using the web interface or git.
      </div>
      <div className="project-button-container">
        <button className="project-button" onClick={handleSubmit}>Create Your New Project!</button>
      </div>
    </div>

  )
}

export default NewProject