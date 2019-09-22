import React from "react"
import { formatDistanceToNow } from "date-fns"
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Badge,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/core"
import { COLORS } from "../utils/constants"
import getStatusColor from "../utils/getStatusColor"

function Card({ scheduledTweet }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const statusColor = getStatusColor(scheduledTweet.status)

  function deleteScheduledTweet(e) {
    console.log(scheduledTweet)
    onClose(e)
  }

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
        {(scheduledTweet.status === "SCHEDULED" || scheduledTweet.status === "POSTED") && (
          <Text ml={2} fontSize="sm" color="gray.500">
            {formatDistanceToNow(new Date(scheduledTweet.scheduledAt), { addSuffix: true })}
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

      {scheduledTweet.status !== "POSTED" && (
        <>
          <Box mt={8}>
            <Button variant="outline" variantColor={COLORS.primary} size="sm" mr="2">
              Edit
            </Button>
            <Button variant="ghost" variantColor={COLORS.danger} size="sm" onClick={onOpen}>
              Delete
            </Button>
          </Box>
          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Tweets
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button variantColor="red" onClick={deleteScheduledTweet} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialog>
        </>
      )}
    </Box>
  )
}

export default Card
