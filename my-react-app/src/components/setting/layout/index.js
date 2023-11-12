import { Layout, Menu } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'

const { Sider } = Layout
function SettingLayout () {
  const location = useLocation().pathname
  // console.log(location)

  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[location]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key='/settings/ProfileSetting'>
            <Link to={'/settings/ProfileSetting'}>Profile</Link>
          </Menu.Item>
          <Menu.Item key='/settings/AccountSetting'>
            <Link to={'/settings/AccountSetting'}>Account</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="layout-content" style={{ padding: 20 }}>
        <Outlet />
      </Layout>
    </Layout>
  )
}

export default SettingLayout