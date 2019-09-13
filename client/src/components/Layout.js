import React from "react"
import Navigation from "./Navigation"
import { Box } from "@chakra-ui/core"

function Layout({ children }) {
  return (
    <>
      <Navigation />
      <Box
        bg="gray.100"
        h="100%"
        borderTopStyle="solid"
        borderTopWidth={1}
        borderTopColor="gray.200"
        px={24}
        py={16}
      >
        {children}
      </Box>
    </>
  )
}

export default Layout
