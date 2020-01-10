import "./env"
import Sequelize from "sequelize"
import jwt from "jsonwebtoken"
import request from "request-promise"
import pureRequest from "request"
import { createStore } from "@ts/database"

const TOKEN_SECRET = process.env.TOKEN_SECRET
const TWITTER_API = "https://api.twitter.com/1.1"
const TWITTER_UPLOAD_API = "https://upload.twitter.com/1.1"

const Op = Sequelize.Op

async function twitter() {
  const store = createStore()
  const { User, ScheduledTweet, Tweet, Media } = store

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
      Tweet.findAll({
        where: { scheduledTweetId: st.id },
        include: [Media],
      }),
    ])

    let { token, secret } = user

    token = jwt.verify(token, TOKEN_SECRET)
    secret = jwt.verify(secret, TOKEN_SECRET)

    try {
      let id = null
      for (let tweet of tweets) {
        const media_ids = (
          await Promise.all(tweet.media.map(media => uploadMedia(media, token, secret)))
        )
          .map(response => response.media_id_string)
          .join(",")
        const res = await postTweet(tweet.content, { id, media_ids }, token, secret)
        id = res.id_str
      }

      st.update({ status: "POSTED" })
    } catch (e) {
      st.update({ status: "ERROR" })
      console.log(e)
    }
  }

  function postToTwitter(data, token, token_secret) {
    return request.post({
      oauth: {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        token,
        token_secret,
      },
      ...data,
    })
  }

  async function uploadMedia({ type, externalUrl, altText }, token, secret) {
    if (type === "TWEET_IMAGE_EXTERNAL") {
      const upload = await postToTwitter(
        {
          url: `${TWITTER_UPLOAD_API}/media/upload.json`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          json: true,
          formData: {
            media_category: "tweet_image",
            media: {
              value: pureRequest(externalUrl),
              options: {
                filename: "upload.png",
                contentType: "image/png",
              },
            },
          },
        },
        token,
        secret,
      )

      if (altText) {
        await postToTwitter(
          {
            url: `${TWITTER_UPLOAD_API}/media/metadata/create.json`,
            headers: {
              "Content-Type": "application/json",
            },
            json: true,
            body: { media_id: upload.media_id_string, alt_text: { text: altText.slice(0, 420) } },
          },
          token,
          secret,
        )
      }

      return upload
    } else {
      throw new Error("unknown media type")
    }
  }

  function postTweet(status, { id, media_ids }, token, secret) {
    return postToTwitter(
      {
        url: `${TWITTER_API}/statuses/update.json`,
        headers: {
          "Content-Type": "application/json",
        },
        json: true,
        form: {
          status,
          media_ids,
          ...(id
            ? {
                in_reply_to_status_id: id,
                auto_populate_reply_metadata: true,
              }
            : {}),
        },
      },
      token,
      secret,
    )
  }
}

twitter()
