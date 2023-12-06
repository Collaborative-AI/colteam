import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/authenticate/login'
import SignUp from './components/authenticate/signup'
import Data from './components/data/data'
import Team from './components/team'
import Home from './components/home'
import Navbar from './components/navbar'
import ForgetPasswd from './components/authenticate/forget_passwd'
import ResetPasswd from './components/authenticate/reset_passwd'
import NewProject from './components/project/newProject.component'
import ShowProject from './components/project/show_project.component'
import ProjectDetail from './components/project/show_project_detail.component'
import EmailVerification from './components/authenticate/email_verification'
import UpdateProject from './components/project/updateProject.component'
import LogOut from './components/authenticate/logout'
import ProjectLayout from './components/project/allproject/projectLayout/'
import SettingLayout from './components/setting/layout'
import AccountSetting from './components/setting/account_setting'
import ProfileSetting from './components/setting/profile_setting'
import Messages from './components/messages/messages'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="auth-wrapper">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/data" element={<Data />} />
            <Route path="/team" element={<Team />} />
            <Route path="/project" element={<ProjectLayout />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/log_in" element={<Login />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/forget_passwd" element={<ForgetPasswd />} />
            <Route path="/reset_passwd/:user_id" element={<ResetPasswd />} />
            <Route path="/log_out" element={<LogOut />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/new_project" element={<NewProject />} />
            <Route path="/show_project" element={<ShowProject />} />
            <Route path="/show_project_detail" element={<ProjectDetail />} />
            <Route path="/email_verification" element={<EmailVerification />} />
            <Route path="/update_project" element={<UpdateProject />} />
            <Route path="/settings" element={<SettingLayout />} >
              <Route path='ProfileSetting' element={<ProfileSetting />}></Route>
              <Route path='AccountSetting' element={<AccountSetting />}></Route>
            </Route>
            {/* <Route path='/show_all_project' element={<ProjectLayput />} /> */}
          </Routes>

        </div>
      </div>
    </Router>
  )
}
export default App