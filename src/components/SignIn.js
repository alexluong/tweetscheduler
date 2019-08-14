/** @jsx jsx */
import React from "react"
import { jsx, Styled } from "theme-ui"
import TwitterSignIn from "./TwitterSignIn"

function SignIn() {
  return (
    <div>
      <Styled.h1>Scheduled TweetStorm</Styled.h1>

      <Styled.h2>You can schedule tweetstorm using this app.</Styled.h2>
      <Styled.p>Check it out</Styled.p>

      <TwitterSignIn sx={{ mb: 4 }} />

      <hr />

      <footer>
        <Styled.p>
          Built by <a href="https://twitter.com/alex__luong">Alex Luong</a> -{" "}
          <a href="https://github.com/alexluong/scheduled-tweetstorm">GitHub</a>
        </Styled.p>
      </footer>
    </div>
  )
}

export default SignIn
