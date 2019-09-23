import React from "react"
import { Flex, Grid, IconButton, Textarea } from "@chakra-ui/core"
import { COLORS } from "../utils/constants"

function TweetInput({ tweet, onChange, removeTweet }) {
  return (
    <Grid my={8} templateColumns="auto 50px">
      <Textarea
        placeholder="Tweet..."
        value={tweet.content}
        onChange={e => onChange(e.target.value)}
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
