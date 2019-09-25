import React from "react"
import { Link, navigate } from "gatsby"
import { COLORS } from "../utils/constants"
import { Flex, Button, Heading, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core"
import CreateTweet from "./CreateTweet"
import { useAuth } from "./AuthContext"

function Navigation() {
  const { username, signOut } = useAuth()

  function signOutAndNavigate() {
    signOut()
    navigate("/")
  }

  return (
    <Flex
      align={["start", "start", "center"]}
      justify="space-between"
      direction={["column", "column", "row"]}
      px={[8, 12, 16, 24]}
      py={6}
    >
      <Link to="/dashboard">
        <Heading as="h1" size="md" display="block" mb={[4, 4, 0]}>
          Tweet Scheduler
        </Heading>
      </Link>
      <Flex align="center" justify="start" direction={["column-reverse", "column-reverse", "row"]}>
        <CreateTweet>
          <Button
            to="/new"
            variant="outline"
            variantColor={COLORS.primary}
            display={["none", "none", "inline-flex"]}
            mr={2}
          >
            Schedule a Tweet
          </Button>
        </CreateTweet>
        <Button
          as={Link}
          to="/dashboard"
          variant="ghost"
          variantColor={COLORS.primary}
          display={["none", "none", "inline-flex"]}
          mr={2}
        >
          Dashboard
        </Button>
        {/* <Button as={Link} to="/archives" variant="ghost" variantColor={COLORS.primary} mr={2}>
          Archives
        </Button> */}

        <Menu>
          <MenuButton as={Button} rightIcon="chevron-down" mb={[4, 4, 0]}>
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
