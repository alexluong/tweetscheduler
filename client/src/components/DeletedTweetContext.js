import React from "react"

const DeletedTweetContext = React.createContext()

function DeletedTweetProvider({ children }) {
  const [deletedTweets, setDeletedTweets] = React.useState([])

  return (
    <DeletedTweetContext.Provider value={{ deletedTweets, setDeletedTweets }}>
      {children}
    </DeletedTweetContext.Provider>
  )
}

function useDeletedTweets() {
  return React.useContext(DeletedTweetContext)
}

export { DeletedTweetContext, DeletedTweetProvider, useDeletedTweets }
export default DeletedTweetContext
