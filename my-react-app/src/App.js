import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './antdTheme.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import SignUp from './pages/signup'
import Data from './components/data/data'
import ApiKeys from './components/apiKeys/apiKeys'
import Team from './components/team/team'
import Home from './pages/home'
import ForgetPasswd from './components/authenticate/forget_passwd'
import ResetPasswd from './components/authenticate/reset_passwd'
import NewProject from './components/project/new_project'
import MyProject from './components/project/my_project.jsx'
import ShowProject from './components/project/show_project.component'
import ProjectDetail from './components/project/project_detail'
import EmailVerification from './components/authenticate/email_verification'
import UpdateProject from './components/project/updateProject'
import LogOut from './pages/logout'
import Project from './pages/project'
import SettingLayout from './components/setting/layout'
import AccountSetting from './components/setting/account_setting'
import ProfileSetting from './components/setting/profile_setting'
import Messages from './components/messages/messages'
import Person from './components/Person/person'
import Info from './components/Person/info'
import Api from './components/Person/api'
import NoticeSetting from './components/Person/noticeSetting'
import ChatBox from './components/messages/chatBox'
import GroupChat from './components/messages/groupChat'
import Notice from './components/messages/notice'
import Comment from './components/messages/comment'
import CreateRoom from './components/messages/createRoom'
import JoinRoom from './components/messages/joinRoom'
import AddChat from './components/messages/addChat'
import Layout from './Layout'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <Routes>

            <Route path="/log_in" element={<Login />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/forget_passwd" element={<ForgetPasswd />} />
            <Route path="/reset_passwd/:user_id" element={<ResetPasswd />} />
            <Route path="/email_verification" element={<EmailVerification />} />
            <Route path='/' element={<Layout />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/data" element={<Data />} />
              <Route path="/apiKeys" element={<ApiKeys />} />
              <Route path="/team" element={<Team />} />
              <Route path="/project" element={<Project />} />
              {/* <Route path="/log_out" element={<LogOut />} /> */}
              <Route path="/messages" element={<Messages />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
              <Route path="/new_project" element={<NewProject />} />
              <Route path="/my_project" element={<MyProject />} />
              <Route path="/show_project" element={<ShowProject />} />
              <Route path="/project_detail/:id" element={<ProjectDetail />} />
              <Route path="/update_project/:id" element={<UpdateProject />} />
              <Route path="/settings" element={<SettingLayout />} >
                <Route path='ProfileSetting' element={<ProfileSetting />}></Route>
                <Route path='AccountSetting' element={<AccountSetting />}></Route>
              </Route>
              <Route path="/messages" element={<Messages />} >
                <Route path='ChatBox' element={<ChatBox />}></Route>
                <Route path='groupChat' element={<GroupChat />}></Route>
                <Route path='comment' element={<Comment />}></Route>
                <Route path='notice' element={<Notice />}></Route>
                {/* <Route path='CreateRoom' element={<CreateRoom />}></Route>
                <Route path='JoinRoom' element={<JoinRoom />}></Route>
                <Route path='AddChat' element={<AddChat />}></Route> */}
              </Route>
              <Route path="/center" element={<Person />} >
                <Route path='info' element={<Info />}></Route>
                <Route path='api' element={<Api />}></Route>
                <Route path='noticeSetting' element={<NoticeSetting />}></Route>
              </Route>
              <Route path='*' element={<NotFound />}></Route>
            </Route>
            {/* <Route path='/show_all_project' element={<ProjectLayput />} /> */}
          </Routes>

        </div>

      </div>
    </Router>
  )
}
export default App