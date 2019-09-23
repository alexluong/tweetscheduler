import { gql } from "apollo-server-express"

const typeDefs = gql`
  type Query {
    hello: String
    dashboardView: DashboardView
    scheduledTweetView(id: ID!): ScheduledTweetView
  }

  type Mutation {
    updateScheduledTweet(scheduledTweet: ScheduledTweetInput!): ScheduledTweet
  }

  type DashboardView {
    id: ID!
    scheduledTweets: [ScheduledTweet]!
  }

  type ScheduledTweetView {
    id: ID!
    scheduledTweet: ScheduledTweet!
  }

  type User {
    id: ID!
    upcoming: [ScheduledTweet]!
    archived: [ScheduledTweet]!
  }

  type ScheduledTweet {
    id: ID!
    status: String!
    tweets: [Tweet!]!
    scheduledAt: String!
    updatedAt: String!
    createdAt: String!
  }

  type Tweet {
    id: ID!
    content: String!
  }

  input ScheduledTweetInput {
    id: ID!
    status: String!
    scheduledAt: String!
    tweets: [TweetInput!]!
  }

  input TweetInput {
    id: ID!
    content: String!
  }
`

export default typeDefs
