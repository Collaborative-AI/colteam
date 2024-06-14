import React from 'react'
import { useState, useContext } from 'react'
import '../../index.css'
import colteam_logo from '../../assets/images/colteam_logo.png'
import axios from 'axios'
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
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { getToken, getUserEmail } from '../../utils';

const { TextArea } = Input;
function NewProject() {
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [website, setWebsite] = useState("")

  const navigate = useNavigate()

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
  console.log(getUserEmail())

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    const data = {
      email: getUserEmail(),
      title: projectName,
      description: description,
      website: website
    }
    const config = {
      headers: {
        Authorization: "Bearer " + getToken()
      }
    }

    axios
      .post('http://localhost:8000/projects/create/', data, config)
      .then((response) => {
        console.log(response.data)
        navigate('/show_project')
      })
      .catch((error) => {
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
    <div>
      <div className="create-project-header-container">
        <div>
          <img className="logo" src={colteam_logo} alt="" />
        </div>
        <div className="create-project-title-text">Create a new model repository</div>
        <div className="create-project-subtitle-text">A repository contains all model files, including the revision history.</div>
        <Form
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
                <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
                    <Checkbox>Checkbox</Checkbox>
                </Form.Item>
                <Form.Item label="Input">
                    <Input />
                </Form.Item>
                <Form.Item label="Select">
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
                </Form.Item>
            </Form>
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <Checkbox>同意xx协议</Checkbox>
          <Button>确定</Button>
        </div>
      </div>

    </div>

  )
}

export default NewProject