import React from "react"
import { Box, Text } from "@chakra-ui/core"
import Auth from "../components/Auth"

function IndexPage() {
  return (
    <Box m={4}>
      <Text mb={5}>Hello, World!</Text>
      <Auth />
    </Box>
  )
}

export default IndexPage
