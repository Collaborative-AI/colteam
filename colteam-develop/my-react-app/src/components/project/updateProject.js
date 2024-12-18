import React, { useState, useEffect } from 'react'
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
import './project.css';
import { SettingOutlined, PlusOutlined, HeartOutlined } from '@ant-design/icons';
import colteam_logo from '../../assets/images/colteam_logo.png';
import { useParams } from 'react-router-dom';
const { TextArea } = Input;
const items = [
    {
        label: 'Product',
        children: <Input value={'Cloud Database'} />,
    },
    {
        label: 'Billing',
        children: <Input value={'Prepaid'} />,
    },
    {
        label: 'Time',
        children: <Input value={'18:00:00'} />,
    },
    {
        label: 'Amount',
        children: <Input value={'$80.00'} />,
    },
    {
        label: 'Discount',
        span: { xl: 2, xxl: 2 },
        children: <Input value={'$20.00'} />,
    },
    {
        label: 'Official',
        span: { xl: 2, xxl: 2 },
        children: <Input value={'$60.00'} />,
    }
];
const UpdateProject = (props) => {
    const params = useParams();
    useEffect(() => {
        console.log(123, params)
    }, [])
    return (
        <div className='project-update'>
            <div>
                <img className="logo" src={colteam_logo} alt="" />
            </div>
            <div className="create-project-title-text">Modify a new model repository</div>
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
    )

}

export default UpdateProject

