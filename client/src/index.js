import React from "react"
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core"
import { AuthProvider } from "./components/AuthContext"
import GlobalStyle from "./components/GlobalStyle"

function Index({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ColorModeProvider value="light">
          <>
            <CSSReset />
            <GlobalStyle />
            {children}
          </>
        </ColorModeProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default Index
