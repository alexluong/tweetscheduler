import merge from "deepmerge"
import typography from "./typography"
import colors from "./colors"
import styles from "./styles"
import buttons from "./buttons"

export default merge(typography, {
  colors,
  fonts: {
    heading: "sans-serif",
    body: "sans-serif",
  },
  sizes: {
    container: 672,
  },
  styles,
  buttons,
})
