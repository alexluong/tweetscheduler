import React from "react"
import { Router } from "@reach/router"
import ThreadContainer from "../components/ThreadContainer"
import SEO from "../components/SEO"

function ThreadPage({ user }) {
  const userId = user.providerData[0].uid
  return (
    <>
      <SEO />
      <Router>
        <ThreadContainer path="/thread/new" userId={userId} />
        <ThreadContainer path="/thread/:threadId" userId={userId} />
      </Router>
    </>
  )
}

export default ThreadPage
