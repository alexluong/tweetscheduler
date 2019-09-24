require("dotenv").config()

module.exports = {
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-145677074-1",
      },
    },
  ],
}
