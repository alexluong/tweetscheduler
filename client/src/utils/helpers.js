import { STATUS } from "./constants"

export function getStatusColor(status) {
  switch (status) {
    case STATUS.draft:
      return "yellow"
    case STATUS.posted:
      return "green"
    case STATUS.scheduled:
    default:
      return "blue"
  }
}

export function stripTypenames(value) {
  if (Array.isArray(value)) {
    return value.map(stripTypenames)
  } else if (value !== null && typeof value === "object") {
    const newObject = {}
    for (const property in value) {
      if (property !== "__typename") {
        newObject[property] = stripTypenames(value[property])
      }
    }
    return newObject
  } else {
    return value
  }
}
