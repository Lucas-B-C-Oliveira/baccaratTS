const http = require('http')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config({
  path: './config.env'
})

const express = require('express')
const app = express()
const socketUtils = require('./socketUtils.js')

const server = http.createServer(app)
const io = socketUtils.sio(server)
socketUtils.connection(io)

//! TODO: Remove socketIOMiddleware!
const socketIOMiddleware = (req, res, next) => {
  req.io = io
  next()
}

/// CORS
app.use(cors())


//! TODO: Remove ROUTES!

// /// ROUTES

// app.use('/api/add-ball', socketIOMiddleware, (req, res) => {
//   req.io.emit("message", `Hello ${req.originalUrl}`)
//   res.send('hello world!!!')
// })

/// LISTEN
// const port = process.env.PORT || 8000
const port = 9014 //TODO: implement a env variable for port connected with react vite
server.listen(port, () => {
  console.log(`App running on port ${port}...`)
})