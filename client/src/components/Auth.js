import React from "react"
import io from "socket.io-client"
import { Button } from "@chakra-ui/core"

const API_URL = process.env.GATSBY_API_URL

const socket = io(API_URL)
let popup = null

function Auth() {
  const [disabled, setDisabled] = React.useState(null)
  const [user, setUser] = React.useState({})

  React.useEffect(() => {
    socket.on("user", user => {
      setUser(user)
      popup.close()
    })
  }, [])

  function signIn() {
    setDisabled(true)
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
        setDisabled(false)
      }
    }, 1000)
  }

  return (
    <div>
      <Button variantColor="teal" size="lg" onClick={signIn}>
        Sign In With Twitter
      </Button>
    </div>
  )
}

export default Auth
