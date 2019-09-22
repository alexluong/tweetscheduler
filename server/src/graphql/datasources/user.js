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
    const id = "KjJGywYu"
    const user = await this.store.User.findByPk(id)

    console.log(user.toJSON())
  }

  async createUser() {
    const user = await this.store.User.create({
      id: shortId.generate(),
      token: "token",
      secret: "secret",
    })

    return user.toJSON()
  }
}

export default UserAPI
