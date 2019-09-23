import { DataSource } from "apollo-datasource"
import Sequelize from "sequelize"
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

  async updateScheduledTweet(st, updates) {
    const { Tweet, ScheduledTweet } = this.store
    const { Op } = Sequelize

    const tweetsId = st.tweets.map(tweet => tweet.id)

    await Tweet.destroy({ where: { id: { [Op.or]: tweetsId } } })
    const createTweetPromise = Tweet.bulkCreate(
      updates.tweets.map(tweet => ({ ...tweet, scheduledTweetId: st.id })),
    )
    const updateScheduledTweetPromise = st.update({
      ...updates,
      scheduledAt: new Date(Number(updates.scheduledAt)),
      tweetsOrder: updates.tweets.reduce((a, v) => `${a},${v.id}`, "").slice(1),
    })
    const [updatedST] = await Promise.all([updateScheduledTweetPromise, createTweetPromise])
    return updatedST
  }
}

export default TweetAPI
