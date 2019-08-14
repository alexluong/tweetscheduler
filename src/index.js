/** @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
import { useFirebase } from "gatsby-plugin-firebase"
import SignIn from "./components/SignIn"
import SignOut from "./components/SignOut"

function Main({ children }) {
  const [user, setUser] = React.useState(undefined)

  useFirebase(firebase => {
    const unlisten = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => {
      unlisten()
    }
  })

  if (user === undefined) {
    return null
  }

  if (user === null) {
    return (
      <Styled.root>
        <div
          sx={{
            maxWidth: "container",
            mx: "auto",
            px: 3,
            py: 4,
          }}
        >
          <SignIn />
        </div>
      </Styled.root>
    )
  }

  return (
    <Styled.root>
      <div
        sx={{
          maxWidth: "container",
          mx: "auto",
          px: 3,
          py: 4,
        }}
      >
        <div sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Styled.p as="h1" sx={{ mb: 0 }}>
            Scheduled TweetStorm
          </Styled.p>
          <div>
            <Styled.p sx={{ mb: 0 }}>{user.displayName}</Styled.p>
            <SignOut sx={{ mb: 0 }}>Sign Out</SignOut>
          </div>
        </div>

        <hr />

        {React.cloneElement(children, { user })}
      </div>
    </Styled.root>
  )
}

export default Main
