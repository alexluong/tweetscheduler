import React from "react"
import {
  Provider as GraphQLProvider,
  Client as GraphQLClient,
  dedupExchange,
  fetchExchange,
} from "urql"
import { cacheExchange } from "@urql/exchange-graphcache"
import fetch from "isomorphic-fetch"
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core"
import { AuthProvider } from "./components/AuthContext"
import { DeletedTweetProvider } from "./components/DeletedTweetContext"
import GlobalStyle from "./components/GlobalStyle"
import SEO from "./components/SEO"

const cache = cacheExchange({})

const client = new GraphQLClient({
  url: `${process.env.GATSBY_API_URL}/graphql`,
  fetch,
  exchanges: [dedupExchange, cache, fetchExchange],
  fetchOptions: () => {
    let token
    if (typeof window !== "undefined") {
      token = JSON.parse(localStorage.getItem("accessToken"))
    }
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    }
  },
})

function Index({ children }) {
  return (
    <GraphQLProvider value={client}>
      <AuthProvider>
        <DeletedTweetProvider>
          <ThemeProvider>
            <ColorModeProvider value="light">
              <>
                <SEO />
                <CSSReset />
                <GlobalStyle />
                {children}
              </>
            </ColorModeProvider>
          </ThemeProvider>
        </DeletedTweetProvider>
      </AuthProvider>
    </GraphQLProvider>
  )
}

export default Index
