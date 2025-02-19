// import React, { useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import AuthContext from './AuthProvider.component'
// import Button from 'react-bootstrap/Button'
// import Container from 'react-bootstrap/Container'
// import Form from 'react-bootstrap/Form'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
// import profile_image from '../assets/images/colteam_logo.png'
// // import { getUserStatus } from '../utils'


// function NavbarIns() {
//   const { auth } = useContext(AuthContext)

//   const navigate = useNavigate()
//   const handleDropdownSelect = (eventKey) => {
//     switch (eventKey) {
//       case 'action-1':
//         navigate('/new_project')
//         break
//       case 'action-2':
//         navigate('/show_project')
//         break
//       case 'action-3':
//         navigate('/settings/ProfileSetting')
//         break
//       case 'action-4':
//         navigate('/log_out')
//         break
//       case 'action-5':
//         navigate('/messages')
//         break
//       case 'action-6':
//         navigate('/messages/createRoom')
//         break
//       case 'action-7':
//         navigate('/messages/joinRoom')
//         break
//       case 'action-8':
//         navigate('/messages/addChat')
//         break
//       case 'action-9':
//         navigate('/apiKeys')
//         break
//       default:
//         break
//     }
//   }

//   return (
//     <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
//       <Container fluid>
//         <Navbar.Brand>ColAI</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           {/* <Nav defaultActiveKey="/data" as="ul" onSelect={(e, event) => navigate(e)}>
//             <Nav.Item as="li">
//               <Nav.Link href="/home">Active</Nav.Link>
//             </Nav.Item>
//             <Nav.Item as="li">
//               <Nav.Link eventKey="/data">Link</Nav.Link>
//             </Nav.Item>
//             <Nav.Item as="li">
//               <Nav.Link eventKey="/team">Link</Nav.Link>
//             </Nav.Item>
//           </Nav> */}
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100%' }}
//             navbarScroll
//             defaultActiveKey="/data"
//             onSelect={(href) => navigate(href)}
//           >
//             <Nav.Link eventKey={'/data'}>
//               Data
//             </Nav.Link>
//             <Nav.Link eventKey={'/team'}>
//               Team
//             </Nav.Link>
//             <Nav.Link eventKey={'/project'}>
//               Project
//             </Nav.Link>
//             {!auth.success ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to={'/messages'}>
//                     Messages
//                   </Link>
//                 </li>
//                 <NavDropdown title="Messages" id="navbarScrollingDropdown" onSelect={handleDropdownSelect}>
//                   <NavDropdown.Item eventKey="action-5">My messages</NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item eventKey="action-6">Create Room</NavDropdown.Item>
//                   <NavDropdown.Item eventKey="action-7">Join Room</NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item eventKey="action-8">Create Chat</NavDropdown.Item>
//                 </NavDropdown>

//                 <NavDropdown title="Profile" id="navbarScrollingDropdown" onSelect={handleDropdownSelect}>
//                   <NavDropdown.Item eventKey="action-1">New Project</NavDropdown.Item>
//                   <NavDropdown.Item eventKey="action-2">My Project</NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item eventKey="action-9">My API Keys</NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item eventKey="action-3">My Profile</NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item eventKey="action-4">log out</NavDropdown.Item>
//                 </NavDropdown>
//               </>
//             ) : (
//               <>
//                 < li className="nav-item">
//                   <Link className="nav-link" to={'/log_in'}>
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to={'/sign_up'}>
//                     Sign up
//                   </Link>
//                 </li>
//               </>)}
//           </Nav>
//           <Nav className="ml-auto">
//             <Form className="d-flex">
//               <Form.Control
//                 type="search"
//                 placeholder="Search"
//                 className="me-2"
//                 aria-label="Search"
//               />
//               <Button variant="outline-success">Search</Button>
//             </Form>
//           </Nav>
//         </Navbar.Collapse>
//       </Container >
//     </Navbar >
//   )
// }



// export default NavbarIns
import React, { useContext, useState } from 'react';
import { Layout, Menu, theme, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import AvatarDropdown from './AvatarDropdown';
import AuthContext from './AuthProvider.component';
import { getToken } from '../utils'
import axios from 'axios';

const { Header } = Layout;
const items = [{
  label: '首页',
  key: '/',}
// }, {
//   label: '数据',
//   key: '/data',
// }, {
//   label: '学习',
//   key: '/team',
// }, {
  , {label: '项目',
  key: '/project',
}]

const App = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {
    token: { colorBgBase, colorPrimary },
  } = theme.useToken();
  const { auth, setAuth } = useContext(AuthContext)

  const handleLogOut = (event) => {
    event.preventDefault()
    const config = {
      headers: {
        Authorization: "Bearer " + getToken(),
      }
    }

    axios
      .post('http://localhost:8000/users/logout/', null, config)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error:', error.message)
      })
      .finally(() => {
        localStorage.clear()
        setAuth(false)
        navigate('/log_in')
      })
  }
  return (
    <>
      <Header style={{ background: '#fff', zIndex: 1000, width: '100%', position: 'fixed', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colorBgBase, padding: '0 12px', boxShadow: '0 12px 10px -10px rgba(0,0,0,.1)'}}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
    <div className="demo-logo" style={{ 
      fontSize: '22px', 
      color: '#000', 
      fontWeight: 'bold', 
      marginRight: '20px' 
    }}>ColAI</div>
    
    <Menu
      mode="horizontal"
      onClick={e => navigate(e.key)}
      defaultSelectedKeys={['/']}
      items={items}
    />
  </div>
        {/* <div style={{ width: '500px', margin: '0 auto' }} >
          <Input
            placeholder="请输入搜索内容"
            suffix={
              <SearchOutlined style={{ color: colorPrimary }} />
            }
          />
        </div> */}
        {
          !auth.success ?
            <div>
              <div onClick={() => navigate('/log_in')} style={{ fontWeight: 'bold', borderRadius: '12px', height: '32px', width: '62px', textAlign: 'center', lineHeight: '32px', background: colorPrimary, cursor: 'pointer' }}>登录</div>
            </div> :
            <div style={{ cursor: 'pointer', flex: "0 0 80px", marginLeft: '16px', height: '64px', lineHeight: '62px' }}>
              {/* <svg style={{ marginRight: '12px' }} t="1710339075590" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4246" width="22" height="22"><path d="M851.2 720c-3.2 0-3.2 0 0 0-32-16-51.2-44.8-51.2-80v-252.8c-3.2-92.8-89.6-201.6-208-230.4-3.2-54.4-38.4-96-80-96s-76.8 41.6-80 96c-121.6 25.6-204.8 137.6-208 230.4v256c0 32-22.4 64-51.2 76.8-32 0-60.8 28.8-60.8 60.8 0 35.2 28.8 60.8 60.8 60.8h195.2c9.6 67.2 70.4 121.6 140.8 121.6s131.2-51.2 140.8-121.6h195.2c35.2 0 60.8-28.8 60.8-60.8s-22.4-60.8-54.4-60.8zM512 89.6c22.4 0 44.8 25.6 48 57.6-32-3.2-64-3.2-96 0 3.2-28.8 25.6-57.6 48-57.6z m0 844.8c-54.4 0-99.2-38.4-108.8-89.6h220.8c-12.8 51.2-57.6 89.6-112 89.6z m339.2-121.6H172.8c-16 0-28.8-12.8-28.8-28.8s12.8-28.8 28.8-28.8c3.2 0 6.4 0 6.4-3.2h3.2c41.6-19.2 67.2-60.8 70.4-105.6v-3.2L256 640v-243.2c0-86.4 80-195.2 198.4-214.4 35.2-6.4 73.6-6.4 105.6 0 121.6 16 208 128 208 217.6v249.6c0 44.8 28.8 86.4 70.4 105.6H848c16 0 28.8 12.8 28.8 28.8 3.2 12.8-9.6 28.8-25.6 28.8z" p-id="4247" fill="#181818"></path></svg> */}
              <AvatarDropdown loginOut={() => setOpen(true)} />
            </div>
        }
      </Header>
      <Modal title={''} open={open} onOk={handleLogOut} onCancel={() => setOpen(false)} >
        <h3 style={{ height: '180px', lineHeight: '180px', textAlign: 'center' }}>Are you sure to log out? </h3>
      </Modal>
    </ >
  );
};

export default App;