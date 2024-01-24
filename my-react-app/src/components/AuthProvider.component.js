import { createContext, useState } from "react"
import { getToken, getUserEmail, getUserRole } from '../utils'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        email: getUserEmail() || '',
        password: '',
        // ...FormData,
        roles: getUserRole || '',
        accessToken: getToken() || '',
        // success: getToken() != null && getToken() != '',
        success:true
    })


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext