import React, { useState, useEffect, useContext, useMemo } from 'react'
import axios from 'axios'
import AuthContext from '../AuthProvider.component'
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
  Avatar,
  Flex,
  List
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { SettingOutlined, PlusOutlined, HeartOutlined } from '@ant-design/icons';
import './project.css';

const { TextArea } = Input;
const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    }
];
const items = [
    {
        label: 'Product',
        children: <Input value={'Cloud Database'} />,
    },
    {
        label: 'Billing',
        children: 'Prepaid',
    },
    {
        label: 'Time',
        children: '18:00:00',
    },
    {
        label: 'Amount',
        children: '$80.00',
    },
    {
        label: 'Discount',
        span: { xl: 2, xxl: 2 },
        children: '$20.00',
    },
    {
        label: 'Official',
        span: { xl: 2, xxl: 2 },
        children: '$60.00',
    },
    {
        label: 'Config Info',
        span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
        children: (
            <>
                Data disk type: MongoDB
                <br />
                Database version: 3.4
                <br />
                Package: dds.mongo.mid
            </>
        ),
    },
    {
        label: 'Hardware Info',
        span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
        children: (
            <>
                CPU: 6 Core 3.5 GHz
                <br />
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China 1
            </>
        ),
    },
];
function ProjectDetail() {
    const navigate = useNavigate();
    return (
        <div className='project-detail'>
            <div style={{ overflow: 'hidden', textAlign: 'center' }}>
                <h4 style={{ textAlign: 'left', marginRight: '18px', display: 'inline-block' }}>
                    Project
                </h4>
                <HeartOutlined key="heart" />
                <SettingOutlined key="setting" onClick={() => navigate('/update_project/123')} />
            </div>
            {/* <Flex align={'flex-start'} gap={32}>
                <div>
                    <span>作者：</span>
                    123
                </div>
                <div>
                    <span>创建时间：</span>
                    123
                </div>
                <div>
                    <span>修改时间：</span>
                    123
                </div>
            </Flex> */}
            <div style={{ fontSize: '28px', overflow: "hidden" }}>
                <h4 style={{ textAlign: 'center' }}>项目描述</h4>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    style={{ width: '300px', float: 'right' }}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
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
                        maxWidth: 800,
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
            </div>
            {/* <Descriptions
                title="Responsive Descriptions"
                bordered
                column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                items={items}
                style={{ marginTop: '18px' }}
            /> */}
        </div>
    )

}

export default ProjectDetail

