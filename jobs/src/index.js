import "./env"
import Sequelize from "sequelize"
import jwt from "jsonwebtoken"
import request from "request-promise"
import { createStore } from "@ts/database"

const TOKEN_SECRET = process.env.TOKEN_SECRET
const TWITTER_API = "https://api.twitter.com/1.1"

const Op = Sequelize.Op

async function twitter() {
  const { User, ScheduledTweet, Tweet } = createStore()

  try {
    const time = new Date()

    const STs = await ScheduledTweet.findAll({
      where: { status: "SCHEDULED", scheduledAt: { [Op.lt]: time } },
    })

    STs.forEach(st => postScheduledTweet(st))
  } catch (e) {
    console.log(e)
  }

  async function postScheduledTweet(st) {
    const [user, tweets] = await Promise.all([
      User.findByPk(st.userId),
      Tweet.findAll({ where: { scheduledTweetId: st.id } }),
    ])

    let { token, secret } = user

    token = jwt.verify(token, TOKEN_SECRET)
    secret = jwt.verify(secret, TOKEN_SECRET)

    try {
      let id = null
      for (let tweet of tweets) {
        const res = await postTweet(tweet.content, id, token, secret)
        id = res.id_str
      }

      st.update({ status: "POSTED" })
    } catch (e) {
      st.update({ status: "ERROR" })
      console.log(e)
    }
  }

  function postTweet(status, id, token, secret) {
    return request.post({
      url: `${TWITTER_API}/statuses/update.json`,
      oauth: {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        token,
        token_secret: secret,
      },
      json: true,
      headers: {
        "Content-Type": "application/json",
      },
      form: {
        status,
        ...(id
          ? {
              in_reply_to_status_id: id,
              auto_populate_reply_metadata: true,
            }
          : {}),
      },
    })
  }
}

twitter()
