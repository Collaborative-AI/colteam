import React, { Component, useState } from 'react'
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
                    style={{ height: '80%', borderRight: 0 }}
                >
                    <Menu.Item key='/messages/chatBox'>
                        <Link to={'/messages/chatBox'}>我的好友</Link>
                    </Menu.Item>
                    <Menu.Item key='/messages/groupChat'>
                        <Link to={'/messages/groupChat'}>我的群聊</Link>
                    </Menu.Item>
                    <Menu.Item key='/messages/comment'>
                        <Link to={'/messages/comment'}>评论和@</Link>
                    </Menu.Item>
                    <Menu.Item key='/messages/notice'>
                        <Link to={'/messages/notice'}>系统通知</Link>
                    </Menu.Item>
                </Menu>
                {/* <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={[location]}
                style={{ height: '20%', borderRight: 0 }}>
                    <Menu.Item key='/messages/createRoom'>
                        <Link to={'/messages/createRoom'}>Create Room</Link>
                        </Menu.Item>
                        <Menu.Item key='/messages/joinRoom'>
                        <Link to={'/messages/joinRoom'}>Join Room</Link>
                        </Menu.Item>
                        <Menu.Item key='/messages/addChat'>
                        <Link to={'/messages/addChat'}>Create Chat</Link>
                        </Menu.Item>
                </Menu> */}
            </Sider>

            <Layout className="layout-content" style={{ padding: 20 }}>
                <Outlet />
            </Layout>
        </Layout>

    )

}

export default Messages