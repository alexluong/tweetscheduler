const resolvers = {
  Query: {
    hello: (root, args, { dataSources }) => {
      dataSources.userAPI.findUser()
      return "Hello world!"
    },

    /**
     * Dashboard View
     */
    dashboardView: async (root, args, { dataSources, user }) => {
      const scheduledTweets = await dataSources.tweetAPI.findDashboardData(user.id)
      return { id: "dashboardView", scheduledTweets }
    },

    /**
     * Scheduled Tweet View
     */
    scheduledTweetView: async (root, { id }, { dataSources, user }) => {
      const scheduledTweet = await dataSources.tweetAPI.findScheduledTweet(id)
      if (!scheduledTweet) {
        throw new Error(`Cannot find Scheduled Tweet with id "${id}"`)
      }
      if (scheduledTweet.userId !== user.id) {
        throw new Error("Unauthorized")
      }
      return { id: "ScheduledTweetView", scheduledTweet }
    },
  },
}

export default resolvers
