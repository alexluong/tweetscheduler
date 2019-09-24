require("dotenv").config()

module.exports = {
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-145677074-1",
      },
    },
  ],
}
