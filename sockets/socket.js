const passport = require('../config/passport')
const passportSocketIo = require('passport.socketio')

const onlineUser = []
const socketModule = (io, port) => {
 
  io.on('connection', socket => {
    console.log(`Socket.io is listening on ${port}`)
    console.log('a user connected!')
  })
}

module.exports = {
  onlineUser,
  socketModule
}
