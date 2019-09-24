import "./config/env"
import http from "http"
import express from "express"
import session from "express-session"
import socketio from "socket.io"
import cors from "cors"
import passport from "passport"
import jwt from "jsonwebtoken"
import { Strategy as TwitterStrategy } from "passport-twitter"
import { createStore } from "@ts/database"
import createApolloServer from "./graphql"

const TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: `${process.env.API_URL}/twitter/callback`,
}

const SESSION_SECRET = process.env.SESSION_SECRET
const TOKEN_SECRET = process.env.TOKEN_SECRET
const JWT_SECRET = process.env.JWT_SECRET

const store = createStore()

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Twitter Auth
app.use(express.json())
app.use(passport.initialize())

app.use(cors())

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
)

passport.serializeUser((user, cb) => cb(null, user))
passport.deserializeUser((obj, cb) => cb(null, obj))

passport.use(
  new TwitterStrategy(TWITTER_CONFIG, async (token, secret, profile, cb) => {
    const { User } = store

    let user

    const existingUser = await User.findByPk(profile.id)
    if (existingUser) {
      user = existingUser.toJSON()
    } else {
      const newUser = await User.create({
        id: profile.id,
        username: profile.username,
        token: jwt.sign(token, TOKEN_SECRET),
        secret: jwt.sign(secret, TOKEN_SECRET),
      })
      user = newUser.toJSON()
    }

    cb(null, user)
  }),
)

const twitterAuth = passport.authenticate("twitter")

const addSocketIdToSession = (req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
}

app.get("/twitter", addSocketIdToSession, twitterAuth)

app.get("/twitter/callback", twitterAuth, (req, res) => {
  io.in(req.session.socketId).emit("token", {
    token: jwt.sign(req.user, JWT_SECRET),
    username: req.user.username,
  })
  res.end()
})

// Apollo
const apolloServer = createApolloServer(store)
apolloServer.applyMiddleware({ app })

// Start server
const PORT = 8080
server.listen({ port: PORT }, () =>
  console.log(`🚀 GraphQL ready at http://127.0.0.1:${PORT}/graphql`),
)
