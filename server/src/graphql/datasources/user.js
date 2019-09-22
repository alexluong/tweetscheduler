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

  async findUser() {
    const result = await this.store.User.create({
      id: shortId.generate(),
      token: "token",
      secret: "secret",
    })

    console.log(result.toJSON())
  }
}

export default UserAPI
