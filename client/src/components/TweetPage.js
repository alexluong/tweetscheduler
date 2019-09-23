import React from "react"
import { useQuery } from "urql"
import gql from "graphql-tag"
import DatePicker from "react-datepicker"
import { Badge, Box, Button, Input, Text } from "@chakra-ui/core"
import PrivateRoute from "./PrivateRoute"
import Layout from "./Layout"
import TweetInput from "./TweetInput"
import getStatusColor from "../utils/getStatusColor"
import { COLORS } from "../utils/constants"

const tweetQuery = gql`
  query ScheduledTweetViewQuery($id: ID!) {
    scheduledTweetView(id: $id) {
      id
      scheduledTweet {
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

function TweetPageContainer({ id }) {
  const [res] = useQuery({ query: tweetQuery, variables: { id } })
  return <TweetPage fetching={res.fetching} error={res.error} data={res.data} />
}

function TweetPage({ fetching, error, data }) {
  if (fetching) {
    return (
      <PrivateRoute>
        <Layout>
          <p>Fetching...</p>
        </Layout>
      </PrivateRoute>
    )
  }

  if (error) {
    console.log(error)
    return (
      <PrivateRoute>
        <Layout>
          <p>Error...</p>
        </Layout>
      </PrivateRoute>
    )
  }

  const scheduledTweet = data.scheduledTweetView.scheduledTweet

  return (
    <PrivateRoute>
      <Layout>
        <Box mx="auto" maxW={800}>
          <Badge variantColor={getStatusColor(scheduledTweet.status)}>
            {scheduledTweet.status}
          </Badge>

          {scheduledTweet.tweets.map((tweet, i) => (
            <TweetInput key={tweet.id} index={i} tweet={tweet} onChange={() => {}} />
          ))}

          <Button
            leftIcon="add"
            variant="outline"
            variantColor={COLORS.primary}
            size="sm"
            mb={8}
            display="flex"
            // alignItems="center"
          >
            Add another tweet
          </Button>

          <DatePicker
            minDate={Number(scheduledTweet.scheduledAt)}
            selected={Number(scheduledTweet.scheduledAt)}
            onChange={() => {}}
            showTimeSelect
            shouldCloseOnSelect
            timeIntervals={1}
            dateFormat="MMMM d, yyyy h:mm aa"
            customInput={<DatePickerInput />}
          />

          <Box mt={12}>
            <Button variantColor={COLORS.primary} mr={4}>
              Schedule Tweet
            </Button>
            <Button variant="outline" variantColor={COLORS.primary} mr={4}>
              Save as Draft
            </Button>
            <Button variant="ghost" variantColor={COLORS.danger} mr={4}>
              Delete
            </Button>
          </Box>
        </Box>
      </Layout>
    </PrivateRoute>
  )
}

function DatePickerInput({ value, onClick }) {
  return (
    <Text as="label" fontWeight="bold" fontSize="lg">
      Choose post time
      <Input onClick={onClick} onFocus={onClick} defaultValue={value} mt={3} w={250} />
    </Text>
  )
}

export default TweetPageContainer

// const data = {
//   id: "1",
//   status: "DRAFT",
//   scheduledAt: 1568607537858,
//   tweets: [{ content: "Hello" }, { content: "World" }],
// }
