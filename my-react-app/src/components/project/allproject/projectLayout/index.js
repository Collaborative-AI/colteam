import { Layout } from 'antd'
import './index.scss'
import AllProject from '../projectContent/index'

const { Header } = Layout

function ProjectLayout () {

  return (
    <Layout>
      <Header className="header">

      </Header>
      <Layout className="layout-content" style={{ padding: 20 }}> <AllProject /> </Layout>
    </Layout>

  )
}

export default ProjectLayout
