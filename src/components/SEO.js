import React from "react"
import Helmet from "react-helmet"

function SEO() {
  const title = "Scheduled TweetStorm"
  const description = "You can schedule tweetstorm with using this site."
  const author = "Alex Luong"

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={title}
      meta={[
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: author,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
      ]}
    />
  )
}

export default SEO
