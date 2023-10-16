import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/authenticate/login.component'
import SignUp from './components/authenticate/signup.component'
import Data from './components/data/data.component'
import Team from './components/team.component'
import Home from './components/home.component'
import Navbar from './components/navbar.component'
import ForgetPasswd from './components/authenticate/forget_passwd.component'
import Project from './components/project/project.component'
import Profile from './components/profile.component'
import NewProject from './components/project/newProject.component'
import ShowProject from './components/project/show_project.component'
import ProjectDetail from './components/project/show_project_detail.component'
import EmailVerification from './components/authenticate/email_verification'

function App () {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/data" element={<Data />} />
              <Route path="/team" element={<Team />} />
              <Route path="/project" element={<Project />} />
              <Route path="/log-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forget_passwd" element={<ForgetPasswd />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/new_project" element={<NewProject />} />
              <Route path="/show_project" element={<ShowProject />} />
              <Route path="/show_project_detail" element={<ProjectDetail />} />
              <Route path="/email_verification" element={<EmailVerification />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App