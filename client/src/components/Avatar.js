import React from "react"
import { Image } from "@chakra-ui/core"

function Avatar({ url, alt }) {
  return <Image src={url} alt={alt} rounded="full" w="32px" h="32px" />
}

export default Avatar
