import React from "react"
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core"
import GlobalStyle from "./components/GlobalStyle"

function Index({ children }) {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <>
          <CSSReset />
          <GlobalStyle />
          {children}
        </>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default Index
