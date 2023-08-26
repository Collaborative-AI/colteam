import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthProvider.component'
import { useNavigate } from 'react-router-dom'

function ShowProject() {
  const [projects, setProjects] = useState([]);
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    // URL
    const backendURL = 'http://localhost:8000/';

    axios.get(`${backendURL}/projects/get`, {
      params: {
        id: auth.username
      }
    })
    .then(response => setProjects(response.data))
    .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleReturn = () => {
    navigate('/profile');
  }

  return (
    <div>
      <h1>Projects List</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
      <button onClick={handleReturn}>Return</button>
    </div>
  );
}

export default ShowProject;
