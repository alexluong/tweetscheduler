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
        body,
        #___gatsby,
        #gatsby-focus-wrapper {
          min-height: 100vh;
          height: 100%;
        }
      `}
    />
  )
}

export default GlobalStyle
