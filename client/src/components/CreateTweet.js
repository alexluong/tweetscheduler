import React from "react"
import { navigate } from "gatsby"
import { useMutation } from "urql"
import gql from "graphql-tag"

const createTweetMutation = gql`
  mutation createTweetMutation {
    createScheduledTweet {
      id
    }
  }
`

function CreateTweet({ children }) {
  const [res, createTweet] = useMutation(createTweetMutation)

  function onClick() {
    createTweet()
  }

  if (res.data) {
    navigate(`/tweet/${res.data.createScheduledTweet.id}`)
  }

  return React.cloneElement(children, { onClick })
}

export default CreateTweet
