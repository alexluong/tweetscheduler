import React from "react"
import { Grid, Heading } from "@chakra-ui/core"
import PrivateRoute from "../components/PrivateRoute"
import Layout from "../components/Layout"
import Card from "../components/Card"

function DashboardPage() {
  return (
    <PrivateRoute>
      <Layout>
        <Heading as="h2" size="lg" mb={8}>
          Upcoming
        </Heading>
        <Grid gap={16} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {data.upcoming.map(ts => (
            <Card key={ts.id} scheduledTweet={ts} />
          ))}
        </Grid>

        <Heading as="h2" size="lg" mb={8} mt={16}>
          Archives
        </Heading>
        <Grid gap={16} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
          {data.archives.map(ts => (
            <Card key={ts.id} scheduledTweet={ts} />
          ))}
        </Grid>
      </Layout>
    </PrivateRoute>
  )
}

export default DashboardPage

const data = {
  upcoming: [
    {
      id: "1",
      status: "DRAFT",
      scheduledAt: 1568607537858,
      tweets: [{ content: "Hello" }],
    },
    {
      id: "2",
      status: "SCHEDULED",
      scheduledAt: 1568953243533,
      tweets: [{ content: "Hello" }, { content: "World" }],
    },
    {
      id: "5",
      status: "SCHEDULED",
      scheduledAt: 1568953243533,
      tweets: [{ content: "Hello" }, { content: "World" }],
    },
  ],
  archives: [
    {
      id: "3",
      status: "POSTED",
      scheduledAt: 1567743656561,
      tweets: [{ content: "Hello" }, { content: "World" }, { content: "World" }],
    },
    {
      id: "4",
      status: "POSTED",
      scheduledAt: 1567570865565,
      tweets: [{ content: "Hello" }, { content: "World" }],
    },
  ],
}
