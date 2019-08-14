/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { FirebaseContext } from "gatsby-plugin-firebase"

function SignOut() {
  const firebase = React.useContext(FirebaseContext)

  function signOut() {
    firebase.auth().signOut()
  }

  return (
    <button
      type="button"
      onClick={signOut}
      sx={{ variant: "buttons.secondary", px: 2, fontSize: 1 }}
    >
      Sign Out
    </button>
  )
}

export default SignOut
