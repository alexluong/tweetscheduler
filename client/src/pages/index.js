import React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Icon,
  List,
  ListItem,
  ListIcon,
  Link,
} from "@chakra-ui/core"
import Auth from "../components/Auth"
import { useAuth } from "../components/AuthContext"
import TwitterIcon from "../components/TwitterIcon"
import { COLORS } from "../utils/constants"

function IndexPage() {
  const { isAuthenticated } = useAuth()

  return (
    <Box maxW={667} mx="auto" py={16} px={5}>
      <Heading as="h1" mb={5} color="teal.400">
        Tweet Scheduler
      </Heading>
      <Text mb={5} fontSize={18}>
        We'll post your tweets for you anytime you want. Pinky promise!
      </Text>

      {isAuthenticated ? (
        <Button as={GatsbyLink} to="/dashboard" size="lg" mt={5} variantColor={COLORS.primary}>
          Go to Dashboard
        </Button>
      ) : (
        <Auth>
          <Button size="lg" mt={5} color="#fff" bg="#1DA1F2" _hover={{ bg: "#1a91da" }}>
            <TwitterIcon width={18} height={18} />
            <Box as="span" ml={3}>
              Sign in with Twitter
            </Box>
          </Button>
        </Auth>
      )}

      <List mt={12} spacing={3}>
        <Heading as="h2" size="md" mb={4}>
          How it works
        </Heading>

        <ListItem>
          <ListIcon icon="chat" color="teal.400" />
          Write your tweet
        </ListItem>
        <ListItem>
          <ListIcon icon="calendar" color="teal.400" />
          Choose when you want it posted
        </ListItem>
        <ListItem>
          <ListIcon icon="moon" color="teal.400" />
          Go to bed. Rest assured that your tweet will be posted right on schedule!
        </ListItem>
      </List>

      <List mt={12} spacing={3}>
        <Heading as="h2" size="md" mb={4}>
          Features
        </Heading>

        <ListItem>
          <ListIcon icon="check" color="green.500" />
          Schedule tweet
        </ListItem>
        <ListItem>
          <ListIcon icon="check" color="green.500" />
          Tweetstorm too
        </ListItem>
        <ListItem>
          <ListIcon icon="close" color="red.500" />
          No media (photo, gif, etc)
          <br />
          <small>*You can still post photo or gif using its URL</small>
        </ListItem>
      </List>

      <Box as="footer" mt={16}>
        <Box m={-4} p={4} bg="gray.100" borderRadius={4}>
          <Text mb={2}>
            Built with{" "}
            <Link isExternal href="https://gatsbyjs.org">
              Gatsby
            </Link>
            ,{" "}
            <Link isExternal href="https://reactjs.org">
              React
            </Link>
            ,{" "}
            <Link isExternal href="https://formidable.com/open-source/urql/">
              urql
            </Link>
            ,{" "}
            <Link isExternal href="https://www.apollographql.com/">
              Apollo
            </Link>
            , and{" "}
            <Link isExternal href="https://chakra-ui.com">
              Chakra UI
            </Link>
          </Text>

          <Box>
            <Flex
              display="inline-flex"
              as={Link}
              isExternal
              href="https://github.com/alexluong/tweetscheduler"
              align="center"
              mr={5}
              mb={2}
            >
              Open sourced on GitHub <Icon name="external-link" mx={1} />
            </Flex>
          </Box>

          <Text mb={2}>
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by{" "}
            <Link isExternal href="https://alexluong.com">
              Alex Luong
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default IndexPage
