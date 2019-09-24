import React from "react"
import { useAuth } from "./AuthContext"

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <p>Not Authenticated</p>
  } else {
    return children
  }
}

export default PrivateRoute
