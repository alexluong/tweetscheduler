import React from "react"
import DatePicker from "react-datepicker"
import { Badge, Box, Button, IconButton, Input, Text } from "@chakra-ui/core"
import Layout from "../components/Layout"
import TweetInput from "../components/TweetInput"
import { getStatusColor } from "../utils/helpers"
import { COLORS } from "../utils/constants"

function DatePickerInput({ value, onClick }) {
  return (
    <Text as="label" fontWeight="bold" fontSize="lg">
      Choose post time
      <Input onClick={onClick} onFocus={onClick} value={value} mt={3} w={250} />
    </Text>
  )
}

function NewPage() {
  return (
    <Layout>
      <Box mx="auto" maxW={800}>
        <Badge variantColor={getStatusColor(data.status)}>{data.status}</Badge>

        {data.tweets.map((tweet, i) => (
          <TweetInput key={i} index={i} tweet={tweet} onChange={() => {}} />
        ))}

        <IconButton
          aria-label="Add tweet"
          icon="add"
          variant="outline"
          variantColor={COLORS.primary}
          size="sm"
          display="block"
          mb={8}
        />

        <DatePicker
          minDate={data.scheduledAt}
          selected={data.scheduledAt}
          onChange={() => {}}
          showTimeSelect
          shouldCloseOnSelect
          timeIntervals={1}
          dateFormat="MMMM d, yyyy h:mm aa"
          customInput={<DatePickerInput />}
        />

        <Box mt={12}>
          <Button variantColor={COLORS.primary} mr={4}>
            Schedule Tweet
          </Button>
          <Button variant="outline" variantColor={COLORS.primary} mr={4}>
            Save as Draft
          </Button>
          <Button variant="ghost" variantColor={COLORS.danger} mr={4}>
            Delete
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}

export default NewPage

const data = {
  id: "1",
  status: "DRAFT",
  scheduledAt: 1568607537858,
  tweets: [{ content: "Hello" }, { content: "World" }],
}
