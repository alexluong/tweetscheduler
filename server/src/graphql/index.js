import { ApolloServer } from "apollo-server-express"
import schema from "./schema"
import resolvers from "./resolvers"

const server = new ApolloServer({ typeDefs: schema, resolvers })

export default server
