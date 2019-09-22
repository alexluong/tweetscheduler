import React from "react"

const AuthContext = React.createContext()

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [username, setUsername] = React.useState("")

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken")
      const persistedUsername = JSON.parse(localStorage.getItem("username"))
      if (accessToken) {
        setIsAuthenticated(true)
      }
      if (persistedUsername) {
        setUsername(persistedUsername)
      }
    }
  }, [])

  function signOut() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("username")
    setIsAuthenticated(false)
    setUsername("")
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, username, setUsername, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const auth = React.useContext(AuthContext)
  return auth
}

export { AuthContext, AuthProvider, useAuth }
export default AuthContext
