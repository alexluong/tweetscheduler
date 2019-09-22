const resolvers = {
  Query: {
    hello: (root, args, { dataSources }) => {
      dataSources.userAPI.findUser()
      return "Hello world!"
    },
  },
}

export default resolvers
