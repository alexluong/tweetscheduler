require("dotenv").config()

const proxy = require("http-proxy-middleware")

module.exports = {
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-react-helmet",
    { resolve: "gatsby-plugin-firebase", options: { features: { database: true, auth: true } } },
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src"),
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-145677074-1",
      },
    },
  ],

  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      }),
    )
  },
}
