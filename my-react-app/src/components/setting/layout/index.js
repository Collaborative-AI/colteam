import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

const { Sider } = Layout
function SettingLayout () {


  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={1}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key='/'>
            <Link to={'/'}>Profile</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  )
}

export default SettingLayout