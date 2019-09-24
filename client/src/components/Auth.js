import React from "react"
import { navigate } from "gatsby"
import io from "socket.io-client"
import { useAuth } from "./AuthContext"

const API_URL = process.env.GATSBY_API_URL

const socket = io(API_URL)
let popup = null

function Auth({ children }) {
  const [isDisabled, setIdDisabled] = React.useState(null)
  const { setIsAuthenticated, setUsername } = useAuth()

  React.useEffect(() => {
    function onToken({ token, username }) {
      localStorage.setItem("accessToken", JSON.stringify(token))
      localStorage.setItem("username", JSON.stringify(username))
      setIsAuthenticated(true)
      setUsername(username)
      popup.close()
      navigate("/dashboard")
    }
    socket.on("token", onToken)
    return () => socket.off("token", onToken)
  }, [setIsAuthenticated, setUsername])

  function signIn() {
    setIdDisabled(true)
    popup = openPopup()
    checkPopup()
  }

  function openPopup() {
    const width = 600
    const height = 600
    const left = window.innerWidth / 2 - width / 2
    const top = window.innerHeight / 2 - height / 2

    const url = `${API_URL}/twitter?socketId=${socket.id}`

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`,
    )
  }

  function checkPopup() {
    const check = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        setIdDisabled(false)
      }
    }, 1000)
  }

  return React.cloneElement(children, { onClick: signIn, isDisabled })
}

export default Auth
