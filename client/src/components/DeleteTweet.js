import React from "react"
import { useMutation } from "urql"
import gql from "graphql-tag"
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/core"

const deleteTweetMutation = gql`
  mutation deleteTweetMutation($scheduledTweetId: ID!) {
    deleteScheduledTweet(scheduledTweetId: $scheduledTweetId) {
      id
    }
  }
`

function DeleteTweet({ id, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const [res, deleteTweet] = useMutation(deleteTweetMutation)

  console.log(res)

  if (res.data) {
    // onClose()
  }

  return (
    <>
      {React.cloneElement(children, { onClick: onOpen })}

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Delete Tweet
        </AlertDialogHeader>

        <AlertDialogBody>Are you sure? This tweet will be permanently deleted.</AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button variantColor="red" ml={3} onClick={() => deleteTweet({ scheduledTweetId: id })}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialog>
    </>
  )
}

export default DeleteTweet
