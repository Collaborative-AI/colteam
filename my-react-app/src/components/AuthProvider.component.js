import { createContext, useState } from "react"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        email: 'test@test.com',
        // password: '',
        ...FormData,
        roles: '',
        accessToken: '',
        success: false,
    })

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext