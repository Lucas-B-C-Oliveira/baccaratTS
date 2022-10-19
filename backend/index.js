const http = require('http')
const dotenv = require('dotenv')
const cors = require('cors')


dotenv.config({
  path: './config.env'
})

const express = require('express')
const app = express()
const socketUtils = require('./socketUtils.js')

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app)
const io = socketUtils.sio(server)
socketUtils.connection(io)


/// CORS
app.use(cors())

/// LISTEN
// const port = process.env.PORT || 8000
const port = 9014 //TODO: implement a env letiable for port connected with react vite
server.listen(port, () => {
  console.log(`App running on port ${port}...`)
})