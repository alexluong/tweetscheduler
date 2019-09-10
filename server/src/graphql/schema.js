import { gql } from "apollo-server-express"

const typeDefs = gql`
  type User {
    id: ID!
    token: String!
    secret: String!
    upcoming: [ScheduledTweet]!
    archived: [ScheduledTweet]!
  }

  type ScheduledTweet {
    id: ID!
    status: String!
    scheduledAt: Int!
    tweets: [Tweet!]!
  }

  type Tweet {
    content: String!
  }

  type Query {
    hello: String
  }
`

export default typeDefs
