const Sequelize = require("sequelize")
const path = require("path")

exports.createStore = function() {
  const db = new Sequelize("database", "username", "password", {
    dialect: "sqlite",
    storage: path.join(__dirname, "..", `store.${process.env.NODE_ENV}.sqlite`),
    operatorsAliases: { $in: Sequelize.Op.in },
    logging: false,
  })

  console.log(process.env.NODE_ENV)

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
    updater: Sequelize.INTEGER, // update updatedAt value even if nothing changes
  })

  const Tweet = db.define("tweet", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    content: Sequelize.STRING,
  })

  const Media = db.define("media", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    type: Sequelize.STRING,
    externalUrl: Sequelize.STRING,
    altText: Sequelize.STRING,
  })

  User.hasMany(ScheduledTweet)
  ScheduledTweet.belongsTo(User)
  ScheduledTweet.hasMany(Tweet, { onDelete: "cascade" })
  Tweet.hasMany(Media, { onDelete: "cascade" })

  // in dev: uncomment to (re)create sqlite database
  // db.sync({ force: true })

  return { User, ScheduledTweet, Tweet, Media }
}
