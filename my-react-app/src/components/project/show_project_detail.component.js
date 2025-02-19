import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../AuthProvider.component';

function ProjectDetail({ match }) {
  const projectId = match.params.id;
  const [project, setProject] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    // URL
    const backendURL = 'http://localhost:8000';
    axios
      .get(`${backendURL}/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
      })
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => console.error('Error fetching project data:', error));
  }, [projectId, auth.accessToken]);

  if (!project) {
    // Loading Information
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Project Details</h1>
      <h2>Title: {project.title}</h2>
      <p>Description: {project.description}</p>
      {/* Other Information */}
    </div>
  );
}

export default ProjectDetail;
