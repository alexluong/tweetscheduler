import React from "react"
import shortid from "shortid"
import { FirebaseContext, useFirebase } from "gatsby-plugin-firebase"

export function useScheduleThread(threadId, userId) {
  const firebase = React.useContext(FirebaseContext)
  const db = firebase.database()

  function scheduleThread(tweets, time) {
    const finalThreadId = threadId ? threadId : shortid.generate()
    const promises = [
      db.ref(`upcoming/threads/${userId}/${finalThreadId}`).set({ tweets, willPostAt: time }),
      db.ref(`upcoming/schedule/${time}`).push({ threadId: finalThreadId, userId }),
    ]
    return Promise.all(promises)
  }

  return { scheduleThread }
}

function snapshotDataToThreads(snapshot) {
  const data = snapshot.val()
  if (!data) return []
  const arr = Object.entries(data)
    .map(([id, value]) => ({ ...value, id }))
    .sort((a, b) => a.willPostAt - b.willPostAt)
  return arr
}

function useThreadList(threadType, userId) {
  const [threads, setThreads] = React.useState([])

  function onValueChange(snapshot) {
    setThreads(snapshotDataToThreads(snapshot))
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
    willPostAt: new Date(),
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
