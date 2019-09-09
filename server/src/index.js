import express from "express"
import { ApolloServer, gql } from "apollo-server-express"

const app = express()

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
}

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

const PORT = 8080
app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}`))
