import { Table, Tag, Card } from 'antd'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { getToken } from '../../../../utils'


function AllProject () {
  const [projectList, setProjectList] = useState({
    list: [],
    count: 0,
  })

  const [params, setParmas] = useState({
    page: 1,
    per_page: 10
  })


  useEffect(() => {
    axios
      .get(`http://localhost:8000/projects/detail/view_all`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      .then((response) => {
        console.log("project data from backend")
        console.log(response.data)
        //projectList(render current project list, and set total amount projects)
        setProjectList({
          list: response.data.results,
          count: response.data.count
        })
      })
      .catch((error) => console.error('Error fetching all projects data:', error))
  }, [params])




  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'description',
      dataIndex: 'description',
      width: 220
    },
    {
      title: 'categories',
      dataIndex: 'categories',
      // render: data => <Tag color="green">categories</Tag>
    },
    {
      title: 'post_date',
      dataIndex: 'post_date',
      render: (text, { post_date }, index) => {
        const indexOfDot = post_date.indexOf(".")
        return (<p>{post_date.substring(0, indexOfDot).replace("T", " ")}</p>)
      },
      width: 220
    },
    {
      title: 'end_date',
      dataIndex: 'end_date',
      width: 220,
      render: (text, { end_date }, index) => {
        const indexOfDot = end_date.indexOf(".")
        return (<p>{end_date.substring(0, indexOfDot).replace("T", " ")}</p>)
      }
    },
    {
      title: 'website',
      dataIndex: 'read_cwebsiteount'
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

  const data1 = [
    {
      id: 17,
      title: "22",
      post_date: "2023-11-06T21:04:59.885000",
      description: "",
      categories: "1",
      website: "https://www.baidu.com",
      email: "wang3ys@163.com",
      qualification: "",
      owner: 115,
      group_member: null
    },
    {
      id: 27,
      title: "11",
      post_date: "2024-11-06T21:04:59.885000",
      description: "",
      categories: "5",
      website: "https://www.baidu.com",
      email: "wang3ys@163.com",
      qualification: "",
      owner: 115,
      group_member: null
    }
  ]



  const data2 = [
    {
      id: 27,
      title: "hello22222",
      post_date: "2024-11-06T21:04:59.885000",
      description: "",
      categories: "5",
      website: "https://www.baidu.com",
      email: "wang3ys@163.com",
      qualification: "",
      owner: 115,
      group_member: null
    }
  ]

  const data3 = [
    {
      id: 37,
      title: "hello333333",
      // post_date: "2026-11-06T21:04:59.885000",
      // description: "",
      // categories: "1",
      // website: "https://www.baidu.com",
      // email: "wang3ys@163.com",
      // qualification: "",
      // owner: 115,
      // group_member: null
    }
  ]

  // const data = [data1, data2]
  // console.log(data)

  return (
    <Card title={`Total projects: ${projectList.count}`}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={projectList.list}
      />
    </Card>
  )
}

export default AllProject