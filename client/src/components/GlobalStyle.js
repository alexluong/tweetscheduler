import React from "react"
import { Global, css } from "@emotion/core"

function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          font-family: "Lato", sans-serif;
          box-sizing: border-box;
        }
        body {
          height: 100vh;
        }
        #___gatsby,
        #gatsby-focus-wrapper {
          height: 100%;
        }
      `}
    />
  )
}

export default GlobalStyle
