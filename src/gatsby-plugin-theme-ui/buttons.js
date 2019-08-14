const buttonStyles = {
  px: 3,
  py: 1,
  fontSize: 2,
  cursor: "pointer",
  borderRadius: 100000,
  borderWidth: 1,
  borderStyle: "solid",
  ":disabled": {
    bg: "muted",
    cursor: "not-allowed",
  },
}

export default {
  primary: {
    ...buttonStyles,
    color: "white",
    bg: "primary",
    borderColor: "primary",
    ":hover": {
      opacity: 0.8,
    },
  },
  secondary: {
    ...buttonStyles,
    color: "primary",
    bg: "transparent",
    borderColor: "muted",
    ":hover": {
      borderColor: "primary",
    },
  },
}
