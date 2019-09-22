import SQL from "sequelize"
import { createStore } from "../src"

async function init() {
  const { User, ScheduledTweet, Tweet } = createStore()

  await Promise.all([
    User.sync({ force: true }),
    ScheduledTweet.sync({ force: true }),
    Tweet.sync({ force: true }),
  ])
}

init()
