import SQL from "sequelize"
import { createStore } from "../src"
import faker from "faker"
import shortId from "shortid"

const TWITTER_USER_ID = process.env.TWITTER_USER_ID

async function mock() {
  const { ScheduledTweet, Tweet } = createStore()

  function createScheduledTweet(type) {
    const id = shortId.generate()
    const numTweet = Math.floor(Math.random() * 5) + 1

    const options = {
      id,
      status: type,
      scheduledAt: type !== "POSTED" ? faker.date.future() : faker.date.past(),
      userId: TWITTER_USER_ID,
      tweetsOrder: "",
      updater: 1,
    }

    const tweets = []

    for (let i = 0; i < numTweet; i++) {
      const tweetId = shortId.generate()
      tweets.push({
        id: tweetId,
        content: faker.lorem.sentences(Math.floor(Math.random() * 5) + 1),
        scheduledTweetId: id,
      })
      options.tweetsOrder = `${options.tweetsOrder},${tweetId}`
    }

    options.tweetsOrder = options.tweetsOrder.slice(1)

    tweets.forEach(tweet => Tweet.create(tweet))
    ScheduledTweet.create(options)
  }

  createScheduledTweet("DRAFT")
  createScheduledTweet("DRAFT")
  createScheduledTweet("SCHEDULED")
  createScheduledTweet("SCHEDULED")
  createScheduledTweet("POSTED")
  createScheduledTweet("POSTED")
}

mock()
