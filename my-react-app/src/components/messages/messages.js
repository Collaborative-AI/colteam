import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'

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
                        <Link to={'/messages/chatBox'}>chatBox</Link>
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