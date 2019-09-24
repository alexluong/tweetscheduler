import React from "react"
import { Link, navigate } from "gatsby"
import { COLORS } from "../utils/constants"
import { Flex, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core"
import CreateTweet from "./CreateTweet"
import { useAuth } from "./AuthContext"

function Navigation() {
  const { username, signOut } = useAuth()

  function signOutAndNavigate() {
    signOut()
    navigate("/")
  }

  return (
    <Flex align="center" justify="space-between" px={4} py={6}>
      <h1 style={{ fontWeight: 700, fontSize: 18 }}>Tweet Scheduler</h1>
      <Flex align="center" justify="start">
        <CreateTweet>
          <Button to="/new" variant="outline" variantColor={COLORS.primary} mr={2}>
            Schedule a Tweet
          </Button>
        </CreateTweet>
        <Button as={Link} to="/dashboard" variant="ghost" variantColor={COLORS.primary} mr={2}>
          Dashboard
        </Button>
        <Button as={Link} to="/archives" variant="ghost" variantColor={COLORS.primary} mr={2}>
          Archives
        </Button>

        <Menu>
          <MenuButton as={Button} rightIcon="chevron-down">
            @{username}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={signOutAndNavigate}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Navigation
