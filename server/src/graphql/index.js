import { ApolloServer } from "apollo-server-express"
import typeDefs from "./schema"
import resolvers from "./resolvers"
import UserAPI from "./datasources/user"

function createApolloServer(store) {
  const dataSources = () => ({
    userAPI: new UserAPI({ store }),
  })

  const server = new ApolloServer({ typeDefs, resolvers, dataSources })
  return server
}

export default createApolloServer
