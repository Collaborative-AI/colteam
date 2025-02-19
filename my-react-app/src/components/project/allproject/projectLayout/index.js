import { Layout } from 'antd'
import './index.scss'
import AllProject from '../projectContent/index'

const { Header } = Layout

function ProjectLayout () {

  return (
    <div className="auth-inner-large">
      <Layout>
        <Header className="header">
        </Header>
        <Layout className="layout-content" style={{ padding: 20 }}> <AllProject /> </Layout>
      </Layout>
    </div>

  )
}

export default ProjectLayout
