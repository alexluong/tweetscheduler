import SQL from "sequelize"
import { createStore } from "../src"
import faker from "faker"
import shortId from "shortid"

const TWITTER_USER_ID = process.env.TWITTER_USER_ID

async function mock() {
  const { ScheduledTweet, Tweet } = createStore()

  function createScheduledTweet(type) {
    const id = shortId.generate()
    const numTweet = Math.floor(Math.random() * 10) + 1

    ScheduledTweet.create({
      id,
      status: type,
      scheduledAt: type !== "POSTED" ? faker.date.future() : faker.date.past(),
      userId: TWITTER_USER_ID,
    })

    for (let i = 0; i < numTweet; i++) {
      Tweet.create({
        id: shortId.generate(),
        content: faker.lorem.sentences(Math.floor(Math.random() * 5) + 1),
        scheduledTweetId: id,
      })
    }
  }

  createScheduledTweet("DRAFT")
  createScheduledTweet("DRAFT")
  createScheduledTweet("SCHEDULED")
  createScheduledTweet("SCHEDULED")
  createScheduledTweet("POSTED")
  createScheduledTweet("POSTED")
}

mock()
