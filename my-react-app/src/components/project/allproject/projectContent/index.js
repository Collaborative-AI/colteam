import { Table, Tag, Card } from 'antd'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import AuthContext from '../../../AuthProvider.component'


function AllProject () {

  const { auth } = useContext(AuthContext)

  const [projectList, setProjectList] = useState({
    list: [],
    count: 0,
  })

  const [params, setParmas] = useState({
    page: 1,
    per_page: 10
  })

  // data.forEach(function (data) {
  //   data
  // })


  useEffect(() => {
    axios
      .get(`http://localhost:8000/projects/detail/view_all`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      }, { params })
      .then((response) => {
        console.log(response)
        //projectList(render current project list, and set total amount projects)
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
      render: data => <Tag color="green">categories</Tag>
    },
    {
      title: 'post_date',
      dataIndex: 'post_date'
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
      title: "hello",
      post_date: "2023-11-06T21:04:59.885000",
      description: "",
      categories: "1",
      website: "https://www.baidu.com",
      email: "wang3ys@163.com",
      qualification: "",
      owner: 115,
      group_member: null
    }
  ]



  // const data2 = [
  //   {
  //     id: 27,
  //     title: "hello22222",
  //     post_date: "2024-11-06T21:04:59.885000",
  //     description: "",
  //     categories: "5",
  //     website: "https://www.baidu.com",
  //     email: "wang3ys@163.com",
  //     qualification: "",
  //     owner: 115,
  //     group_member: null
  //   }
  // ]

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

  const data = [{ data1 }, { data3 }]
  console.log(data)

  return (
    <Card title={`Total projects: count`}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
      />
    </Card>
  )
}

export default AllProject