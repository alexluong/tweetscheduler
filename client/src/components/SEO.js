import React from "react"
import Helmet from "react-helmet"

function SEO() {
  const title = "Tweet Scheduler"
  const description = "We'll post your tweets for you anytime you want. Pinky promise!"
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
