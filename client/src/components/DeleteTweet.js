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
import { useDeletedTweets } from "./DeletedTweetContext"

const deleteTweetMutation = gql`
  mutation deleteTweetMutation($scheduledTweetId: ID!) {
    deleteScheduledTweet(scheduledTweetId: $scheduledTweetId) {
      id
    }
  }
`

function DeleteTweet({ id, onSuccess, children }) {
  const { deletedTweets, setDeletedTweets } = useDeletedTweets()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const [res, deleteTweet] = useMutation(deleteTweetMutation)

  console.log(res)

  React.useEffect(() => {
    if (res.data) {
      onClose()

      setTimeout(() => {
        setDeletedTweets([...deletedTweets, res.data.deleteScheduledTweet.id])
        onSuccess && onSuccess()
      }, 500)
    }
  }, [res])

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
