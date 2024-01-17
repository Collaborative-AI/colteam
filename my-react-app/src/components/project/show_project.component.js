import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { getToken, getUserEmail, setUserStatus } from '../../utils'
import { Table, Tag, Card } from 'antd'


function ShowProject () {
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    // URL
    const backendURL = 'http://localhost:8000'
    axios.get(`${backendURL}/projects/detail/view_my`, {
      params: {
        id: getUserEmail()
      },
      headers: {
        Authorization: "Bearer " + getToken()
      }
    })
      .then(response => {
        // setProjects(response.data)
        // projects = response.data
        console.log("test:", response.data)
        setProjects({
          list: response.data.results,
          count: response.data.count
        })
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
        Authorization: "Bearer " + getToken()
      }
    }
    axios.post(`http://localhost:8000/projects/delete/`, data, config)
      .then((response) => {
        console.log(response.data)
        navigate('/show_project')
        setProjects(projects.filter(project => project.id !== projectID))
      })
      .catch((error) => {
        setUserStatus(false)
        if (error.response) {
          console.error('Status Code:', error.response.status)

          console.error('Data:', error.response.data)
          console.error('Response Header:', error.response.headers)
        } else {
          console.error('Error:', error.message)
        }
      })
  }

//   return (
//     <div className="auth-inner-large">
//       <h1>Projects List</h1>
//       <ul>
//         {Array.isArray(projects) && projects.map(project => (
//           <li className="show-project-item" key={project.id}>
//             <Link to={`/project/${project.id}`}>{project.title}</Link>
//             <div className="project-button-container">
//               <button className="project-button" onClick={() => handleDelteProject(project.id)}>delete project</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleReturn}>Return</button>
//     </div>
//   )
// }


const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    width: 220
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 220
  },
  {
    title: 'Category',
    dataIndex: 'category',
    // render: data => <Tag color="green">categories</Tag>
  },
  {
    title: 'Post_date',
    dataIndex: 'post_date',
    render: (text, { post_date }, index) => {
      const indexOfDot = post_date.indexOf(".")
      return (<p>{post_date.substring(0, indexOfDot).replace("T", " ")}</p>)
    },
    width: 220
  },
  {
    title: 'End_date',
    dataIndex: 'end_date',
    width: 220,
    render: (text, { end_date }, index) => {
      const indexOfDot = end_date.indexOf(".")
      return (<p>{end_date.substring(0, indexOfDot).replace("T", " ")}</p>)
    }
  },
  {
    title: 'Website',
    dataIndex: 'website'
  },
  {
    title: 'email',
    dataIndex: 'email'
  },
  {
    title: 'qualification',
    dataIndex: 'qualification'
  },
  {
    title: 'owner',
    dataIndex: 'owner'
  },
  {
    title: 'group_member',
    dataIndex: 'group_member'
  }
]

return (
  <Card title={`Total projects: ${projects.count}`}>
    <Table
      rowKey="id"
      columns={columns}
      dataSource={projects.list}
    />
  </Card>
)
}


export default ShowProject
