/** @jsx jsx */
import React from "react"
import { Link } from "gatsby"
import { jsx, Styled } from "theme-ui"
import { useUpcomingThreads, useArchivedThreads } from "../hooks/thread"
import ThreadItem from "../components/ThreadItem"
import SEO from "../components/SEO"

function DashboardPage(props) {
  const userId = props.user.providerData[0].uid

  const upcomingThreads = useUpcomingThreads(userId)
  const archivedThreads = useArchivedThreads(userId)

  return (
    <>
      <SEO />
      <Link to="/thread/new" sx={{ variant: "buttons.primary" }}>
        New Thread
      </Link>

      <section sx={{ mt: 4 }}>
        <Styled.h2>Upcoming</Styled.h2>
        {upcomingThreads.length > 0 ? (
          upcomingThreads.map((thread, index) => (
            <ThreadItem key={index} thread={thread} isUpcoming />
          ))
        ) : (
          <div>There is no upcoming threads.</div>
        )}
        <Styled.h2 sx={{ mt: 4 }}>Archives</Styled.h2>
        {archivedThreads.length > 0 ? (
          archivedThreads.map((thread, index) => <ThreadItem key={index} thread={thread} />)
        ) : (
          <div>There is no archived threads.</div>
        )}
      </section>
    </>
  )
}

export default DashboardPage
