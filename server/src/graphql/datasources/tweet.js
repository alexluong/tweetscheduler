import { DataSource } from "apollo-datasource"
import shortId from "shortid"

class TweetAPI extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }

  async findDashboardData(userId) {
    const scheduledTweets = await this.store.ScheduledTweet.findAll({
      where: { userId },
      order: [["updatedAt", "DESC"]],
      include: [{ model: this.store.Tweet, required: true }],
    })
    return scheduledTweets.map(val => val.toJSON())
  }

  async findScheduledTweet(scheduledTweetId) {
    const scheduledTweet = await this.store.ScheduledTweet.findByPk(scheduledTweetId, {
      include: [{ model: this.store.Tweet, required: true }],
    })
    return scheduledTweet
  }
}

export default TweetAPI
