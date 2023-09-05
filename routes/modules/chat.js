const express = require('express')
const router = express.Router()

const chatController = require('../../controllers/pages/chat-controller')

router.get('/private/:id', chatController.getPrivateChat)
router.get('/private', chatController.getPrivateChats)
router.get('/', chatController.getChatroom)

module.exports = router
