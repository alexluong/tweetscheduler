import React from "react"
import { Router } from "@reach/router"
import TweetPage from "../components/TweetPage"

function TweetRoute({ user }) {
  return (
    <>
      <Router>
        <TweetPage path="/tweet/:id" />
      </Router>
    </>
  )
}

export default TweetRoute
