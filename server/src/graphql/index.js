import { ApolloServer } from "apollo-server-express"
import jwt from "jsonwebtoken"
import typeDefs from "./schema"
import resolvers from "./resolvers"
import UserAPI from "./datasources/user"
import TweetAPI from "./datasources/tweet"

const JWT_SECRET = process.env.JWT_SECRET

function createApolloServer(store) {
  const dataSources = () => ({
    userAPI: new UserAPI({ store }),
    tweetAPI: new TweetAPI({ store }),
  })

  const context = ({ req }) => {
    const ctx = {}
    const token = req.headers.authorization
    if (token) {
      ctx.user = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET)
    } else {
      throw new Error("Unauthenticated")
    }
    return ctx
  }

  return new ApolloServer({ typeDefs, resolvers, dataSources, context })
}

export default createApolloServer
