const Sequelize = require("sequelize")
const path = require("path")

exports.createStore = function() {
  const db = new Sequelize("database", "username", "password", {
    dialect: "sqlite",
    storage: path.join(__dirname, "..", `store.${process.env.NODE_ENV}.sqlite`),
    operatorsAliases: { $in: Sequelize.Op.in },
    logging: false,
  })

  const User = db.define("user", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    username: Sequelize.STRING,
    token: Sequelize.STRING,
    secret: Sequelize.STRING,
  })

  const ScheduledTweet = db.define("scheduled_tweet", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    status: Sequelize.STRING,
    scheduledAt: Sequelize.DATE,
    tweetsOrder: Sequelize.STRING,
  })

  const Tweet = db.define("tweet", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    content: Sequelize.STRING,
  })

  User.ScheduledTweet = User.hasMany(ScheduledTweet)
  ScheduledTweet.Tweets = ScheduledTweet.hasMany(Tweet, { onDelete: "cascade" })

  return { User, ScheduledTweet, Tweet }
}
