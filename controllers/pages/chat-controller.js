const chatController = {
  getChatroom: (req, res, next) => {
    res.locals.layout = 'main'
    res.render('chat/chatroom')
  }
}

module.exports = chatController
