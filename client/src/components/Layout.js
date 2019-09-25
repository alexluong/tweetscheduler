import React from "react"
import Navigation from "./Navigation"
import { Box, Flex } from "@chakra-ui/core"

function Layout({ children }) {
  return (
    <Flex direction="column" minH="100vh" h="100%" overflowX="hidden">
      <Navigation />
      <Box
        flex={1}
        bg="gray.100"
        h="100%"
        borderTopStyle="solid"
        borderTopWidth={1}
        borderTopColor="gray.200"
        px={[8, 12, 16, 24]}
        py={[8, 16]}
      >
        {children}
      </Box>
    </Flex>
  )
}

export default Layout
