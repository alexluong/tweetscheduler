import React from "react"
import TweetParser from "twitter-text"
import { Flex, Grid, IconButton, Textarea, Button } from "@chakra-ui/core"
import { COLORS } from "../utils/constants"
import { MediaInput } from "./MediaInput"

function TweetInput({ tweet, onChange, removeTweet, onAddMedia, onRemoveMedia, onUpdateMedia }) {
  const { valid } = TweetParser.parseTweet(tweet.content)

  return (
    <Grid my={8} templateColumns="auto 50px" gap={4}>
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

      {tweet.media.map((media, mediaIndex) => (
        <React.Fragment key={media.id}>
          <MediaInput media={media} onUpdate={data => onUpdateMedia({ mediaIndex, ...data })} />
          <Flex align="center" justify="center">
            <IconButton
              aria-label="Remove media"
              icon="delete"
              variant="ghost"
              variantColor={COLORS.danger}
              size="sm"
              onClick={() => onRemoveMedia({ mediaIndex })}
            />
          </Flex>
        </React.Fragment>
      ))}
      <div>
        <Button
          leftIcon="add"
          variant="outline"
          variantColor={COLORS.primary}
          size="sm"
          mb={8}
          display="flex"
          onClick={onAddMedia}
        >
          add Media
        </Button>
      </div>
    </Grid>
  )
}

export default TweetInput
