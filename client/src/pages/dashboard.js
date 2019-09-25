import React from "react"
import { useQuery } from "urql"
import gql from "graphql-tag"
import { Box, Grid, Heading, Text, Button } from "@chakra-ui/core"
import PrivateRoute from "../components/PrivateRoute"
import Layout from "../components/Layout"
import Card from "../components/Card"
import CreateTweet from "../components/CreateTweet"
import { useDeletedTweets } from "../components/DeletedTweetContext"
import { COLORS, STATUS } from "../utils/constants"

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
  const [res] = useQuery({ query: dashboardViewQuery, requestPolicy: "cache-and-network" })
  const { deletedTweets } = useDeletedTweets()

  if (res.fetching) {
    return (
      <PrivateRoute>
        <Layout>{/* <p>Fetching...</p> */}</Layout>
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

  const allTweets = res.data.dashboardView.scheduledTweets.filter(
    t => !deletedTweets.includes(t.id),
  )

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
        <Box maxW={1200} mx="auto">
          <CreateTweet>
            <Button variantColor={COLORS.primary} mb={[8, 16]}>
              Create a new Tweet
            </Button>
          </CreateTweet>

          <Heading as="h2" size="lg" mb={8}>
            Scheduled
          </Heading>
          <Grid gap={16} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
            {scheduledTweets.length > 0 ? (
              scheduledTweets.map(ts => <Card key={ts.id} scheduledTweet={ts} />)
            ) : (
              <Text>There are no scheduled posts.</Text>
            )}
          </Grid>

          <Heading as="h2" size="lg" mb={8} mt={16}>
            Drafts
          </Heading>
          <Grid gap={16} templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
            {draftTweets.length > 0 ? (
              draftTweets.map(ts => <Card key={ts.id} scheduledTweet={ts} />)
            ) : (
              <Text>There are no draft tweets.</Text>
            )}
          </Grid>

          <Heading as="h2" size="lg" mb={8} mt={16}>
            Archives
          </Heading>
          <Grid gap={16} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
            {archivedTweets.length > 0 ? (
              archivedTweets.map(ts => <Card key={ts.id} scheduledTweet={ts} />)
            ) : (
              <Text>There are no archives.</Text>
            )}
          </Grid>
        </Box>
      </Layout>
    </PrivateRoute>
  )
}

export default DashboardPage
