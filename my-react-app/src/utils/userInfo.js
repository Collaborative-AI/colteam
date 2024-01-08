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

const setUserStatus = (login_status) => {
  return window.localStorage.setItem(keyStatus, login_status)
}

const getUserStatus = () => {
  return window.localStorage.removeItem(keyStatus)
}

export {
  setUserEmail,
  getUserEmail,
  setUserRole,
  getUserRole,
  setUserStatus,
  getUserStatus,
}
