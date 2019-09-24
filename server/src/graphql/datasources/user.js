import { DataSource } from "apollo-datasource"
import shortId from "shortid"

class UserAPI extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }
}

export default UserAPI
