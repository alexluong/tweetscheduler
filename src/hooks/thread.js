import React from "react"
import shortid from "shortid"
import { FirebaseContext, useFirebase } from "gatsby-plugin-firebase"

export function useScheduleThread(threadId, userId) {
  const firebase = React.useContext(FirebaseContext)
  const db = firebase.database()

  async function scheduleThread(tweets, time, oldTime) {
    const finalThreadId = threadId ? threadId : shortid.generate()
    const promises = []

    if (threadId) {
      const snapshot = await db
        .ref(`upcoming/threads/${userId}/${threadId}/willPostAt`)
        .once("value")
      const oldTime = snapshot.val()
      console.log(oldTime)
      if (time !== oldTime) {
        promises.push(db.ref(`upcoming/schedule/${oldTime}/${finalThreadId}`).remove())
      }
    }

    promises.push(
      db.ref(`upcoming/threads/${userId}/${finalThreadId}`).set({ tweets, willPostAt: time }),
    )
    promises.push(
      db.ref(`upcoming/schedule/${time}/${finalThreadId}`).set({ threadId: finalThreadId, userId }),
    )

    return Promise.all(promises)
  }

  return { scheduleThread }
}

function snapshotDataToThreads(threadType, snapshot) {
  const data = snapshot.val()
  if (!data) return []
  const arr = Object.entries(data)
    .map(([id, value]) => ({ ...value, id }))
    .sort((a, b) =>
      threadType === "upcoming" ? a.willPostAt - b.willPostAt : b.willPostAt - a.willPostAt,
    )
  return arr
}

function useThreadList(threadType, userId) {
  const [threads, setThreads] = React.useState([])

  function onValueChange(snapshot) {
    setThreads(snapshotDataToThreads(threadType, snapshot))
  }

  useFirebase(firebase => {
    const ref = firebase.database().ref(`${threadType}/threads/${userId}`)
    ref.on("value", onValueChange)
    return () => ref.off("value", onValueChange)
  })

  return threads
}

export function useUpcomingThreads(userId) {
  return useThreadList("upcoming", userId)
}

export function useArchivedThreads(userId) {
  return useThreadList("archived", userId)
}

export function useThread(threadId, userId) {
  const [{ tweets, willPostAt }, setThread] = React.useState({
    tweets: [""],
    willPostAt: new Date().getTime(),
  })

  const setTweets = newTweets => setThread(oldThread => ({ ...oldThread, tweets: newTweets }))
  const addTweet = () => setTweets([...tweets, ""])
  const removeTweet = index => () => {
    if (index === 0) return
    setTweets(tweets.filter((v, i) => i !== index))
  }
  const setTweetInput = index => newTweet => {
    const newTweets = [...tweets]
    newTweets[index] = newTweet
    setTweets(newTweets)
  }
  const setWillPostAt = newWillPostAt =>
    setThread(oldThread => ({ ...oldThread, willPostAt: newWillPostAt }))

  useFirebase(firebase => {
    if (threadId) {
      firebase
        .database()
        .ref(`upcoming/threads/${userId}/${threadId}`)
        .once("value")
        .then(snapshot => {
          const data = snapshot.val()
          if (!data) return
          setThread(snapshot.val())
        })
    }
  })

  return { willPostAt, setWillPostAt, tweets, addTweet, removeTweet, setTweetInput }
}
