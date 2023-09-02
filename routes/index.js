const express = require('express')
const router = express.Router()

const admin = require('./modules/admin')
const tweet = require('./modules/tweet')
const user = require('./modules/user')
const chat = require('./modules/chat')
const api = require('./modules/api')

const { userController } = require('../controllers/pages/user-controller')
const followController = require('../controllers/pages/follow-controller')

const errorHandler = require('../middlewares/error-handler')
const chatMiddleware = require('../middlewares/chat')

// passport & auth
const { userLocalAuth, authenticatedUser } = require('../middlewares/auth')


router.use('/api/users', authenticatedUser, api)
router.use('/admin', admin)
router.use('/chat', authenticatedUser, chatMiddleware, chat)
router.use('/users', authenticatedUser, user)
router.use('/tweets', authenticatedUser, tweet)

// user sign in
router.get('/signin', userController.getLoginPage)
router.post('/signin', userLocalAuth, userController.postLogin)

// user sign up
router.get('/signup', userController.getSignupPage)
router.post('/signup', userController.postSignup)

// user logout
router.get('/logout', authenticatedUser, userController.getLogout)

// follow feature
router.post('/followships', authenticatedUser, followController.postFollowship)
router.delete('/followships/:id', authenticatedUser, followController.deleteFollowship)

router.use('/', (req, res) => {
  res.redirect('/tweets')
})

// error handling
router.use('/', errorHandler)

module.exports = router
