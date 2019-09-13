import React from "react"
import { Flex, Grid, IconButton, Textarea } from "@chakra-ui/core"
import { COLORS } from "../utils/constants"

function TweetInput({ index, tweet, onChange }) {
  return (
    <Grid my={8} templateColumns="auto 50px">
      <Textarea placeholder="Tweet..." value={tweet.content} onChange={onChange} />
      <Flex align="center" justify="center">
        <IconButton
          aria-label="Remove tweet"
          icon="delete"
          variant="ghost"
          variantColor={COLORS.danger}
          size="sm"
        />
      </Flex>
    </Grid>
  )
}

export default TweetInput
