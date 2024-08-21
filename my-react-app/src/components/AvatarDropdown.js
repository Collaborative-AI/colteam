import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
export default ({loginOut}) => {
    const navigate = useNavigate();
    const menuItems = [
        {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
        },
        {
            key: 'my_project',
            icon: <UserOutlined />,
            label: '我的项目',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
        },
    ];
    const onMenuClick = (event) => {
        const { key } = event;
        if (key === 'logout') {
            loginOut();
            return;
        }
        navigate(key);
    }
    return (
        <Dropdown
            menu={{
                selectedKeys: [],
                onClick: onMenuClick,
                items: menuItems,
            }}
        >
            <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
        </Dropdown>
    );
}