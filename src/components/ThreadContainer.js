/** @jsx jsx */
import React from "react"
import { Link, navigate } from "gatsby"
import { jsx } from "theme-ui"
import DatePicker from "react-datepicker"

import { useScheduleThread, useThread } from "../hooks/thread"

const CHARACTER_LIMIT = 280

function Input({ index, onRemove, onChange, value, ...props }) {
  const isOverCharLimit = value.length > CHARACTER_LIMIT

  return (
    <div sx={{ position: "relative", display: "flex", mb: 2 }}>
      <label htmlFor={`input_${index}`} sx={{ display: "none" }}>
        Tweet input {index}
      </label>
      <textarea
        {...props}
        id={`input_${index}`}
        rows={4}
        placeholder="Tweet..."
        value={value}
        onChange={e => onChange(e.target.value)}
        sx={{
          boxSizing: "border-box",
          flex: 1,
          p: 2,
          ml: index === 0 ? 0 : 4,
          fontSize: 2,
          borderWidth: isOverCharLimit ? 2 : 1,
          borderRadius: 4,
          borderStyle: "solid",
          borderColor: isOverCharLimit ? "danger" : "muted",
          ":hover": {
            borderColor: "primary",
          },
          ":focus": {
            borderColor: isOverCharLimit ? "danger" : "primary",
            outline: isOverCharLimit ? "default" : "none",
            outlineOffset: 4,
          },
        }}
      />
      {index > 0 && (
        <button
          sx={{ position: "absolute", top: "50%", transform: "translate(0, -50%)" }}
          onClick={onRemove}
        >
          -
        </button>
      )}
    </div>
  )
}

function ThreadContainer({ threadId, userId }) {
  const { scheduleThread } = useScheduleThread(threadId, userId)
  const { tweets, setTweetInput, addTweet, removeTweet, willPostAt, setWillPostAt } = useThread(
    threadId,
    userId,
  )

  const hasError = tweets.some(tweet => tweet.length > CHARACTER_LIMIT)

  return (
    <>
      <Link to="/" sx={{ variant: "buttons.secondary" }}>
        Back to Dashboard
      </Link>

      <div sx={{ my: 3 }}>
        <label>
          <span sx={{ mr: 2 }}>Select post time:</span>
          <DatePicker
            minDate={willPostAt}
            selected={willPostAt}
            onChange={newTime => {
              if (newTime.getTime() > new Date().getTime()) {
                setWillPostAt(newTime)
              }
            }}
            showTimeSelect
            shouldCloseOnSelect
            timeIntervals={1}
            dateFormat="MMMM d, yyyy h:mm aa"
            sx={{
              px: 2,
              py: 1,
              fontFamily: "body",
              fontSize: 2,
              borderRadius: 4,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "muted",
              width: "100%",
            }}
          />
        </label>
      </div>

      {tweets.map((tweet, index) => (
        <Input
          key={index}
          index={index}
          value={tweet}
          onChange={setTweetInput(index)}
          onRemove={removeTweet(index)}
        />
      ))}

      <button sx={{ variant: "buttons.secondary" }} onClick={addTweet}>
        +
      </button>

      <hr />

      <button
        disabled={hasError}
        sx={{ variant: "buttons.primary" }}
        onClick={() => {
          console.log(willPostAt)
          const filteredTweets = tweets.filter(tweet => tweet.length > 0)
          scheduleThread(filteredTweets, willPostAt.getTime()).then(() => navigate("/"))
        }}
      >
        Save
      </button>
    </>
  )
}

export default ThreadContainer
