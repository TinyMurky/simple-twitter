const PrivateChatRecord = require('../../models/mongo/privateChatRecord')

const chatController = {
  getChatroom: (req, res, next) => {
    res.render('chat/public')
  },

  getPrivateChats: async (req, res, next) => {
    res.render('chat/private', {
      receiverName: 'Apple',
      receiverAccount: 'apple'
    })
  },

  getPrivateChat: (req, res, next) => {

  }
}

module.exports = chatController
