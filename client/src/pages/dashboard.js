import React from "react"
import { useQuery } from "urql"
import gql from "graphql-tag"
import { Grid, Heading } from "@chakra-ui/core"
import PrivateRoute from "../components/PrivateRoute"
import Layout from "../components/Layout"
import Card from "../components/Card"
import { STATUS } from "../utils/constants"

const dashboardViewQuery = gql`
  query {
    dashboardView {
      id
      scheduledTweets {
        id
        status
        scheduledAt
        updatedAt
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

  const allTweets = res.data.dashboardView.scheduledTweets

  const scheduledTweets = allTweets
    .filter(tweet => tweet.status === STATUS.scheduled)
    .sort((a, b) => Number(a.scheduledAt) - Number(b.scheduledAt))
  const draftTweets = allTweets
    .filter(tweet => tweet.status === STATUS.draft)
    .sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
  const archivedTweets = allTweets.filter(tweet => tweet.status === STATUS.posted).reverse()

  return (
    <PrivateRoute>
      <Layout>
        <Heading as="h2" size="lg" mb={8}>
          Scheduled
        </Heading>
        <Grid gap={16} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {scheduledTweets.map(ts => (
            <Card key={ts.id} scheduledTweet={ts} />
          ))}
        </Grid>

        <Heading as="h2" size="lg" mb={8} mt={16}>
          Draft
        </Heading>
        <Grid gap={16} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {draftTweets.map(ts => (
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
