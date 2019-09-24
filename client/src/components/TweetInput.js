import React from "react"
import TweetParser from "twitter-text"
import { Flex, Grid, IconButton, Textarea } from "@chakra-ui/core"
import { COLORS } from "../utils/constants"

function TweetInput({ tweet, onChange, removeTweet }) {
  const { valid } = TweetParser.parseTweet(tweet.content)

  return (
    <Grid my={8} templateColumns="auto 50px">
      <Textarea
        placeholder="Tweet..."
        value={tweet.content}
        isInvalid={!valid}
        onChange={e => onChange(e.target.value)}
        height="auto"
        rows={4}
      />

      <Flex align="center" justify="center">
        <IconButton
          aria-label="Remove tweet"
          icon="delete"
          variant="ghost"
          variantColor={COLORS.danger}
          size="sm"
          onClick={removeTweet}
        />
      </Flex>
    </Grid>
  )
}

export default TweetInput
