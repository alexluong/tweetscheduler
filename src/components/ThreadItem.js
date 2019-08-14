/** @jsx jsx */
import { navigate } from "gatsby"
import { jsx } from "theme-ui"
import { format } from "date-fns"
import dompurify from "dompurify"

function ThreadItem({ thread, isUpcoming }) {
  return (
    <div
      {...(isUpcoming && {
        tabIndex: "0",
        onClick: () => navigate(`/thread/${thread.id}`),
      })}
      sx={{
        px: 2,
        mb: 2,
        borderColor: "muted",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 4,
        ...(isUpcoming && {
          cursor: "pointer",
          ":hover": { borderColor: "primary" },
        }),
      }}
    >
      <ul sx={{ pl: 2 }}>
        {thread.tweets.map((status, i) => (
          <li
            key={i}
            sx={{ mb: 1 }}
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(status.replace(/\n/g, "<br />")),
            }}
          />
        ))}
      </ul>

      <p sx={{ fontSize: 1 }}>
        {isUpcoming ? "Will post" : "Posted"} on{" "}
        {format(new Date(thread.willPostAt), "MM/DD/YYYY \\at hh:mm a")}
      </p>
    </div>
  )
}

export default ThreadItem
