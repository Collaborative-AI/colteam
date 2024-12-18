// import { AuthContext } from '../component/AuthProvider.component'
import { useContext } from 'react'

const keyEmail = 'userInfoEmail-key'
const keyRole = 'userInfoRole-key'
const keyStatus = 'userInfoStatus-key'


const setUserEmail = (email) => {
  return window.localStorage.setItem(keyEmail, email)
}

const getUserEmail = () => {
  return window.localStorage.getItem(keyEmail)
}

const setUserRole = (role) => {
  return window.localStorage.setItem(keyRole, role)
}

const getUserRole = () => {
  return window.localStorage.getItem(keyRole)
}


export {
  setUserEmail,
  getUserEmail,
  setUserRole,
  getUserRole,
}
