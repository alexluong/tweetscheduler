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
      order: [["scheduledAt", "ASC"]],
      include: [
        {
          model: this.store.Tweet,
          required: true,
          include: [{ model: this.store.Media }],
        },
      ],
    })
    return scheduledTweets.map(val => val.toJSON())
  }

  async findScheduledTweet(scheduledTweetId) {
    const scheduledTweet = await this.store.ScheduledTweet.findByPk(scheduledTweetId, {
      include: [
        {
          model: this.store.Tweet,
          required: true,
          include: [{ model: this.store.Media }],
        },
      ],
    })
    return scheduledTweet
  }

  async updateScheduledTweet(st, updates) {
    const { Tweet, Media } = this.store
    const { Op } = Sequelize

    const tweetsId = st.tweets.map(tweet => tweet.id)

    // cascade did not work for me, so I had to delete these manually?
    await Media.destroy({ where: { tweetId: { [Op.or]: tweetsId } } })
    await Tweet.destroy({ where: { id: { [Op.or]: tweetsId } } })
    const createTweetPromise = Tweet.bulkCreate(
      updates.tweets.map(tweet => ({ ...tweet, scheduledTweetId: st.id })),
      {
        include: [
          {
            model: this.store.Media,
          },
        ],
      },
    )
    const updateScheduledTweetPromise = st.update({
      ...updates,
      scheduledAt: new Date(Number(updates.scheduledAt)),
      tweetsOrder: updates.tweets.reduce((a, v) => `${a},${v.id}`, "").slice(1),
      updater: st.updater + 1, // update updatedAt value even if nothing changes
    })
    const [updatedST] = await Promise.all([updateScheduledTweetPromise, createTweetPromise])
    return updatedST
  }

  async createScheduledTweet(userId) {
    const { Tweet, ScheduledTweet } = this.store

    const scheduledTweetId = shortId.generate()
    const firstTweetId = shortId.generate()
    const secondTweetId = shortId.generate()

    const st = await ScheduledTweet.create(
      {
        userId,
        id: scheduledTweetId,
        status: "DRAFT",
        scheduledAt: new Date(),
        tweetsOrder: `${firstTweetId},${secondTweetId}`,
        updater: 1,
        tweets: [
          {
            id: firstTweetId,
            content: "Tweet content...",
            scheduledTweetId,
            media: [],
          },
          {
            id: secondTweetId,
            content: "You can also schedule tweetstorm!!",
            scheduledTweetId,
          },
        ],
      },
      {
        include: [
          {
            model: this.store.Tweet,
            include: [this.store.Media],
          },
        ],
      },
    )

    return st
  }

  async deleteScheduledTweet(instance) {
    const deletedST = await instance.destroy()
    return deletedST
  }
}

export default TweetAPI
