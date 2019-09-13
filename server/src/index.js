import "./config/env"
import http from "http"
import express from "express"
import session from "express-session"
import socketio from "socket.io"
import cors from "cors"
import passport from "passport"
import { Strategy as TwitterStrategy } from "passport-twitter"
import apolloServer from "./graphql"

const TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: "http://127.0.0.1:8080/twitter/callback",
}

const SESSION_SECRET = process.env.SESSION_SECRET
const JWT_SECRET = process.env.JWT_SECRET

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
  new TwitterStrategy(TWITTER_CONFIG, (token, secret, profile, cb) => {
    console.log(profile)
    const user = {
      name: profile.username,
      photo: profile.photos[0].value.replace(/_normal/, ""),
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
  io.in(req.session.socketId).emit("user", req.user)
  res.end()
})

// Apollo
apolloServer.applyMiddleware({ app })

// Start server
const PORT = 8080
server.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}`))
