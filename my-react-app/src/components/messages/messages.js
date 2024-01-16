import React, { Component, useState } from 'react'
import { Layout, Menu } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const { Sider } = Layout
const Messages = () => {
    const location = useLocation().pathname

    return (
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={[location]}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key='/messages/chatBox'>
                        <Link to={'/messages/chatBox'}>ChatBox</Link>
                    </Menu.Item>

                    <Menu.Item key='/messages/createRoom'>
                      <Link to={'/messages/createRoom'}>Create Room</Link>
                    </Menu.Item>
                    <Menu.Item key='/messages/joinRoom'>
                      <Link to={'/messages/joinRoom'}>Join Room</Link>
                    </Menu.Item>
                    <Menu.Item key='/messages/addChat'>
                      <Link to={'/messages/addChat'}>Create Chat</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout className="layout-content" style={{ padding: 20 }}>
                <Outlet />
            </Layout>
        </Layout>

    )

}

export default Messages