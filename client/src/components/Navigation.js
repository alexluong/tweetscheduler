import React from "react"
import { Link } from "gatsby"
import { COLORS } from "../utils/constants"
import Avatar from "./Avatar"
import { Flex, Button } from "@chakra-ui/core"

function Navigation() {
  return (
    <Flex align="center" justify="space-between" px={4} py={6}>
      <Avatar
        url="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
        alt="Tweet Scheduler logo"
      />
      <Flex align="center" justify="start">
        <Button as={Link} to="/new" variant="outline" variantColor={COLORS.primary} mr={2}>
          Schedule a Tweet
        </Button>
        <Button as={Link} to="/dashboard" variant="ghost" variantColor={COLORS.primary} mr={2}>
          Dashboard
        </Button>
        <Button as={Link} to="/archives" variant="ghost" variantColor={COLORS.primary} mr={2}>
          Archives
        </Button>

        <Avatar
          url="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
          alt="user profile"
        />
      </Flex>
    </Flex>
  )
}

export default Navigation
