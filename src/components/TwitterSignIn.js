/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"
import { FirebaseContext } from "gatsby-plugin-firebase"

function TwitterSignIn(props) {
  const firebase = React.useContext(FirebaseContext)

  async function handleSignIn() {
    try {
      const result = await firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())

      const token = result.credential.accessToken
      const secret = result.credential.secret
      const userId = result.additionalUserInfo.profile.id_str

      firebase
        .database()
        .ref(`users/${userId}`)
        .set({ token, secret })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      {...props}
      type="button"
      onClick={handleSignIn}
      sx={{
        variant: "buttons.primary",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg viewBox="0 0 400 400" width={32} height={32} sx={{ mr: 1 }}>
        <title>Twitter Logo White-on-Blue</title>
        <path fill="#1da1f2" d="M0 0h400v400H0z" data-name="Dark Blue" />
        <g data-name="Logo \u2014 FIXED">
          <path
            d="M153.62 301.59c94.34 0 145.94-78.16 145.94-145.94 0-2.22 0-4.43-.15-6.63A104.36 104.36 0 00325 122.47a102.38 102.38 0 01-29.46 8.07 51.47 51.47 0 0022.55-28.37 102.79 102.79 0 01-32.57 12.45 51.34 51.34 0 00-87.41 46.78A145.62 145.62 0 0192.4 107.81a51.33 51.33 0 0015.88 68.47A50.91 50.91 0 0185 169.86v.65a51.31 51.31 0 0041.15 50.28 51.21 51.21 0 01-23.16.88 51.35 51.35 0 0047.92 35.62 102.92 102.92 0 01-63.7 22 104.41 104.41 0 01-12.21-.74 145.21 145.21 0 0078.62 23"
            fill="#fff"
          />
          <path fill="none" d="M0 0h400v400H0z" />
        </g>
      </svg>

      <span>Sign In With Twitter</span>
    </button>
  )
}

export default TwitterSignIn
