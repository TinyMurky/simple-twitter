const passport = require('../config/passport')
const passportSocketIo = require('passport.socketio')

const onlineUsers = new Map()

const socketModule = (io, port) => {
  io.use((socket, next) => {
    if (socket.request.user) {
      next()
    } else {
      console.log("unauthorized")
      next(new Error("unauthorized"))
    }
  })

  io.on('connection', socket => {
    console.log(`Socket.io is listening on ${port}`)

    const user = socket.request.user
    const userId = user.id
    
    onlineUsers.set(userId, user)

    socket.broadcast.emit('user connect', user)// 使用者上線時，對其他人廣播此訊息

    io.emit('show user online', Array.from(onlineUsers.values())) // 顯示在線清單

    socket.on('disconnect', () => { // 使用者下線時，將使用者資訊移除
      onlineUsers.delete(userId)
      io.emit('user disconnect', Array.from(onlineUsers.values()), userId)
    })
  })
}


module.exports = {
  onlineUsers,
  socketModule
}
