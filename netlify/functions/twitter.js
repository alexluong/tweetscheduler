import request from "request-promise"
import { FIREBASE_DATABASE_URL, twitterOauth } from "../config"

// TODO: Reduce number of requests by using UPDATE
export async function handler() {
  try {
    const time = new Date().getTime()
    const data = await request.get({
      uri: `${FIREBASE_DATABASE_URL}/upcoming.json`,
      json: true,
    })
    if (data) {
      let scheduleList = Object.keys(data.schedule)
      scheduleList = scheduleList.filter(schedule => time >= schedule)

      const deletePromises = []
      const movePromises = []
      for (let scheduleId of scheduleList) {
        const scheduledThreads = Object.values(data.schedule[scheduleId])
        for (let thread of scheduledThreads) {
          const { userId, threadId } = thread
          const tweetsData = await postThread(userId, threadId)

          deletePromises.push(
            request.delete({
              uri: `${FIREBASE_DATABASE_URL}/upcoming/threads/${userId}/${threadId}.json`,
            }),
          )
          movePromises.push(
            request.put({
              uri: `${FIREBASE_DATABASE_URL}/archived/threads/${userId}/${threadId}.json`,
              body: JSON.stringify(tweetsData),
            }),
          )
        }

        deletePromises.push(
          request.delete({ uri: `${FIREBASE_DATABASE_URL}/upcoming/schedule/${scheduleId}.json` }),
        )
      }

      Promise.all([...deletePromises, ...movePromises])
    }
  } catch (error) {
    console.log(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello" }),
  }
}

async function postThread(userId, threadId) {
  const userPromise = request.get({
    uri: `${FIREBASE_DATABASE_URL}/users/${userId}.json`,
    json: true,
  })
  const tweetsPromise = request.get({
    uri: `${FIREBASE_DATABASE_URL}/upcoming/threads/${userId}/${threadId}.json`,
    json: true,
  })

  const [{ token, secret }, tweetsData] = await Promise.all([userPromise, tweetsPromise])
  const { tweets } = tweetsData

  try {
    let id = null
    for (let tweet of tweets) {
      const res = await postTweet(tweet, id, token, secret)
      console.log(res)

      id = res.id_str
    }
  } catch (error) {
    console.log(error)
  }

  return tweetsData
}

function postTweet(status, id, token, secret) {
  return request.post({
    url: `https://api.twitter.com/1.1/statuses/update.json`,
    oauth: { ...twitterOauth, token, token_secret: secret },
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
