function getStatusColor(status) {
  switch (status) {
    case "DRAFT":
      return "yellow"
    case "POSTED":
      return "green"
    case "SCHEDULED":
    default:
      return "blue"
  }
}

export default getStatusColor
