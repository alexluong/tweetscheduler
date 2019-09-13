import React from "react"
import { Box } from "@chakra-ui/core"

function Avatar({ url, alt }) {
  return <Box as="img" src={url} alt={alt} rounded={100} w="32px" h="32px" />
}

export default Avatar
