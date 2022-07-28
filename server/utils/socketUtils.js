const socketIO = require('socket.io')

exports.sio = (server) => {
  return socketIO(server, {
    transport: ["polling"],
    cors: {
      origin: "*"
    }
  })
}

exports.connection = (io) => {

  io.on("connection", (socket) => {
    console.log('A user is connected')


    socket.on('add balls in score', (ball) => {
      console.log("add balls in score IS CALLED! ")
      // io.emit('add ball in score', ball);
      socket.broadcast.emit('add ball in score', ball);
    });


    socket.on("message", (message) => {
      console.log(`message from ${socket.id} : ${message}`)
    })

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`)
    })

  })
}