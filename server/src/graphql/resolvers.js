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
      return { id: scheduledTweet.id, scheduledTweet }
    },
  },

  Mutation: {
    /**
     * Create Scheduled Tweet
     */
    createScheduledTweet: async (root, args, { dataSources, user }) => {
      const st = await dataSources.tweetAPI.createScheduledTweet(user.id)
      return st
    },

    /**
     * Update Scheduled Tweet
     */
    updateScheduledTweet: async (root, { scheduledTweet }, { dataSources, user }) => {
      const savedST = await dataSources.tweetAPI.findScheduledTweet(scheduledTweet.id)
      if (!savedST) {
        throw new Error(`Cannot find Scheduled Tweet with id "${scheduledTweet.id}"`)
      }
      if (savedST.userId !== user.id) {
        throw new Error("Unauthorized")
      }
      const updatedST = await dataSources.tweetAPI.updateScheduledTweet(savedST, scheduledTweet)
      return updatedST
    },

    /**
     * Delete Scheduled Tweet
     */
    deleteScheduledTweet: async (root, { scheduledTweetId }, { dataSources, user }) => {
      const savedST = await dataSources.tweetAPI.findScheduledTweet(scheduledTweetId)
      if (!savedST) {
        throw new Error(`Cannot find Scheduled Tweet with id "${scheduledTweetId}"`)
      }
      if (savedST.userId !== user.id) {
        throw new Error("Unauthorized")
      }
      const deletedST = await dataSources.tweetAPI.deleteScheduledTweet(savedST)
      return deletedST
    },
  },

  ScheduledTweet: {
    tweets: root => {
      // use tweetOrder field to return an ordered array
      // runtime O(n^2) but since n is small this should be fine
      return root.tweetsOrder.split(",").map(id => root.tweets.find(t => t.id === id))
    },
  },
}

export default resolvers
