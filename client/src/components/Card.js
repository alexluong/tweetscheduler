import React from "react"
import { navigate } from "gatsby"
import { formatDistanceToNow } from "date-fns"
import { Badge, Box, Button, Flex, Text } from "@chakra-ui/core"
import DeleteTweet from "./DeleteTweet"
import { COLORS, STATUS } from "../utils/constants"
import { getStatusColor } from "../utils/helpers"

function Card({ scheduledTweet }) {
  const statusColor = getStatusColor(scheduledTweet.status)

  const mediaSum = scheduledTweet.tweets.reduce((acc, tweet) => acc + tweet.media.length, 0)

  return (
    <Box
      bg="white"
      p={8}
      rounded={4}
      shadow="md"
      borderTopWidth={2}
      borderTopStyle="solid"
      borderTopColor={`${statusColor}.400`}
    >
      <Flex align="baseline">
        <Badge variantColor={statusColor}>{scheduledTweet.status}</Badge>
        {(scheduledTweet.status === STATUS.scheduled ||
          scheduledTweet.status === STATUS.posted) && (
          <Text ml={2} fontSize="sm" color="gray.500">
            {formatDistanceToNow(new Date(Number(scheduledTweet.scheduledAt)), { addSuffix: true })}
          </Text>
        )}
      </Flex>

      <Text mt={4}>
        {scheduledTweet.tweets[0].content.length < 100 && scheduledTweet.tweets.length === 1 ? (
          <>{scheduledTweet.tweets[0].content}</>
        ) : (
          <>
            {scheduledTweet.tweets[0].content.substring(0, 100)} ...{" "}
            <Badge as="span">{scheduledTweet.tweets.length} tweets</Badge>
          </>
        )}
      </Text>

      {mediaSum > 0 && (
        <Badge as="span">{`${mediaSum} media attachment${mediaSum > 1 ? "s" : ""}`} </Badge>
      )}

      {scheduledTweet.status !== STATUS.posted && (
        <>
          <Box mt={8}>
            <Button
              variant="outline"
              variantColor={COLORS.primary}
              size="sm"
              mr="2"
              onClick={() => {
                navigate(`/tweet/${scheduledTweet.id}`)
              }}
            >
              Edit
            </Button>
            <DeleteTweet id={scheduledTweet.id}>
              <Button variant="ghost" variantColor={COLORS.danger} size="sm">
                Delete
              </Button>
            </DeleteTweet>
          </Box>
        </>
      )}
    </Box>
  )
}

export default Card
