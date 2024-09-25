import React from 'react'
import { useState, useContext,useEffect } from 'react'
import '../../index.css'
import colteam_logo from '../../assets/images/colteam_logo.png'
import axios from 'axios'
import dayjs from 'dayjs';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Switch,
  Upload,
} from 'antd';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { getToken, getUserEmail } from '../../utils';

const { TextArea } = Input;
function NewProject() {
  // 路由信息
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [formData,setFormData] = useState({});
  const [show,setShow] = useState(false);
  const [title,setTitle] = useState("Create a new project");
  const navigate = useNavigate();

  const items = [
    {
      label: 'Product',
      children: <Input />,
    },
    {
      label: 'Billing',
      children: <Input />,
    },
    {
      label: 'Time',
      children: <Input />,
    },
    {
      label: 'Amount',
      children: <Input />,
    },
    {
      label: 'Discount',
      span: { xl: 2, xxl: 2 },
      children: <Input />,
    },
    {
      label: 'Official',
      span: { xl: 2, xxl: 2 },
      children: <Input />,
    }
  ];
  const getData = () => {
    axios
      .post("http://localhost:8000/projects/detail/find",{"id":searchParams.get("id")})
      .then((res) => {
        console.log(res.data[0]);
        setFormData({
          id: res.data[0].id,
          title: res.data[0].title,
          "post_date": res.data[0].post_date,
          "end_date": res.data[0].end_date,
          "description": res.data[0].description,
          "website": res.data[0].website,
          "email": res.data[0].email,
          "qualification": res.data[0].qualification,
          "category": res.data[0].category,
          "owner": res.data[0].owner,
          "group_member": res.data[0].group_member,
      });
      })
      .catch((err) => {});
  };
  // 如果有id，查询详情赋值，目前接口异常，写固定值
  useEffect(()=>{
    console.log(searchParams.get("id"));
    if(searchParams.get("id")){
      setTitle("Update project");
      getData();
    }
    setShow(true);
    console.log(formData)
  },[]);
  const handleSubmit = (e) => {
    e.preventDefault()
    const config = {
      headers: {
        Authorization: "Bearer " + getToken()
      }
    }
    if(formData.id){
      axios
        .post('http://localhost:8000/projects/update/', formData, config)
        .then((response) => {
          console.log(response,66);
          if(response.status == 201 || response.status == 200){
            navigate('/project')
          }
          // navigate('/show_project')
        })
        .catch((error) => {
        })
    }else{
      axios
        .post('http://localhost:8000/projects/create/', formData, config)
        .then((response) => {
          if(response.status == 201 || response.status == 200){
            navigate('/project')
          }
          // navigate('/show_project')
        })
        .catch((error) => {
        })
    }

  }
  // 删除当前项目
  const handleDelete = e=>{
    const config = {
      headers: {
        Authorization: "Bearer " + getToken()
      }
    }

    axios
        .post('http://localhost:8000/projects/delete/', {id:searchParams.get("id")}, config)
        .then((response) => {
          console.log(response,66);
          if(response.status == 201 || response.status == 200){
            navigate('/project')
          }
          // navigate('/show_project')
        })
        .catch((error) => {
        })
  }
  // 数据绑定
  const handleChange = (e,time)=>{
    if(!e.target){
      setFormData({
        ...formData,
        end_date:time
      })
    }else{
      if(e.target.name == "tags"){
        setFormData({
          ...formData,
          ["tags"]:[e.target.value]
        })
      }else{
        setFormData({
          ...formData,
          [e.target.name]:e.target.value
        })
      }
      
    }
  }
  return (
    <div>
      <div className="create-project-header-container">
        <div>
          <img className="logo" src={colteam_logo} alt="" />
        </div>
        <div className="create-project-title-text">{title}</div>
        {/* <div className="create-project-subtitle-text">A repository contains all model files, including the revision history.</div> */}
        {show && <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                  margin: '0 auto',
                  textAlign: 'left',
                  maxWidth: 800,
                  marginTop: '24px'
                }}
            >
                <Form.Item label="作者">
                    <Input name="owner" value={formData.owner} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="标题">
                    <Input name="title" value={formData.title} onChange={handleChange}/>
                </Form.Item>
                {/* <Form.Item label="标签">
                    <Input name="tags" value={formData.tags} onChange={handleChange}/>
                </Form.Item> */}
                <Form.Item label="截止时间">
                <DatePicker style={{width:"100%"}}
                name="end_date"
                    format={{
                      format: 'YYYY-MM-DD HH:mm:ss',
                      type: 'mask',
                    }}
                    value={dayjs(formData.end_date,"YYYY-MM-DD HH:mm:ss") }
                    onChange={handleChange}
                  />
                    {/* <Input value={end_date}  onChange={e=>setEndTime(e.target.value)}/> */}
                </Form.Item>
                {/* <Form.Item label="小组成员">
                    <Input value={group_member} onChange={e=>setGroupMember(e.target.value)}/>
                </Form.Item> */}
                <Form.Item label="目录">
                    <Input name="category" value={formData.category} onChange={handleChange}/>
                </Form.Item>
                <Form.Item label="网址">
                    <Input name="website" value={formData.website}  onChange={handleChange}/>
                </Form.Item>
                <Form.Item label="邮箱">
                    <Input name="email" value={formData.email}  onChange={handleChange}/>
                </Form.Item>
                <Form.Item label="资格">
                    <Input name="qualification" value={formData.qualification}  onChange={handleChange}/>
                </Form.Item>
                <Form.Item label="项目描述">
                    <TextArea name="description" value={formData.description}  onChange={handleChange}/>
                </Form.Item>
                {/* <Form.Item label="Select">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="TextArea">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Switch" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <button
                            style={{
                                border: 0,
                                background: 'none',
                            }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item>
                <Form.Item label="Slider">
                    <Slider />
                </Form.Item> */}
            </Form>}
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          {/* <Checkbox>同意xx协议</Checkbox> */}
          <Button onClick={handleSubmit}>确定</Button>
          {formData.id && <Button onClick={handleDelete}>删除</Button>}
        </div>
      </div>

    </div>

  )
}

export default NewProject