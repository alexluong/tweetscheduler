import React from "react"

import { Grid, Textarea, Input, Select } from "@chakra-ui/core"
export function MediaInput({ media: { id, type, externalUrl, altText }, onUpdate }) {
  return (
    <Grid my={0} templateColumns="auto 150px" gap={8}>
      <Grid my={0} templateColumns="10ch auto" rowGap={2}>
        <span htmlFor={`#${id}-type`}>Type:</span>
        <Select id={`#${id}-type`} value={type} isDisabled>
          <option value={type}>{type}</option>
        </Select>

        <label htmlFor={`#${id}-externalUrl`}>Url:</label>
        <Input
          id={`#${id}-externalUrl`}
          value={externalUrl}
          onChange={e => onUpdate({ externalUrl: e.target.value })}
        />
        <label htmlFor={`#${id}-altText`}>Alt:</label>
        <Textarea
          id={`#${id}-altText`}
          value={altText}
          onChange={e => onUpdate({ altText: e.target.value })}
        />
      </Grid>
      <a href={externalUrl} target="_blank" rel="noopener noreferrer">
        <img src={externalUrl || "http://"} style={{ width: "100%", height: "100%" }} />
      </a>
    </Grid>
  )
}
