import React from "react"
import { useQuery } from "urql"
import gql from "graphql-tag"
import { Grid, Heading } from "@chakra-ui/core"
import PrivateRoute from "../components/PrivateRoute"
import Layout from "../components/Layout"
import Card from "../components/Card"

const dashboardViewQuery = gql`
  query {
    dashboardView {
      id
      scheduledTweets {
        id
        status
        scheduledAt
        tweets {
          id
          content
        }
      }
    }
  }
`

function DashboardPage() {
  const [res] = useQuery({ query: dashboardViewQuery })

  if (res.fetching) {
    return (
      <PrivateRoute>
        <Layout>
          <p>Fetching...</p>
        </Layout>
      </PrivateRoute>
    )
  }

  if (res.error) {
    return (
      <PrivateRoute>
        <Layout>
          <p>Error...</p>
        </Layout>
      </PrivateRoute>
    )
  }

  const upcomingTweets = res.data.dashboardView.scheduledTweets.filter(
    tweet => tweet.status !== "POSTED",
  )
  const archivedTweets = res.data.dashboardView.scheduledTweets.filter(
    tweet => tweet.status === "POSTED",
  )

  return (
    <PrivateRoute>
      <Layout>
        <Heading as="h2" size="lg" mb={8}>
          Upcoming
        </Heading>
        <Grid gap={16} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {upcomingTweets.map(ts => (
            <Card key={ts.id} scheduledTweet={ts} />
          ))}
        </Grid>

        <Heading as="h2" size="lg" mb={8} mt={16}>
          Archives
        </Heading>
        <Grid gap={16} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {archivedTweets.map(ts => (
            <Card key={ts.id} scheduledTweet={ts} />
          ))}
        </Grid>
      </Layout>
    </PrivateRoute>
  )
}

export default DashboardPage
