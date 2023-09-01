// 第三方套件
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' })
}
const path = require('path')
const http = require('http')

const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('./config/passport')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const { Server } = require('socket.io')

// 自己的套件
// use helpers.getUser(req) to replace req.user
// use helpers.ensureAuthenticated(req) to replace req.isAuthenticated()
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const routes = require('./routes')
const { socketModule } = require('./sockets/socket')

// 固定變數
const app = express()
const server = http.createServer(app)
const io = new Server(server)
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'I_really_need_to_pass_this_test',
  resave: false,
  saveUninitialized: true
})

const PORT = process.env.PORT || 3000
const SOCKET_PORT = process.env.SOCKET_PORT || 3030

// 檔名結尾叫做handlebars, 主模板:main
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  extname: '.handlebars',
  helpers: handlebarsHelpers
}))
app.set('view engine', 'handlebars')
app.use(methodOverride('_method'))

// 讓express可以解讀form, 也可以用api接收json
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // for test
app.use(express.static(path.join(__dirname, 'public'))) // for css and 前端js

app.use(cookieParser()) // 用來找到JWS cookie
app.use(sessionMiddleware)
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  // 預留給需要放到res.local的message
  res.locals.error_messages = req.flash('error_messages')
  res.locals.success_messages = req.flash('success_messages')
  res.locals.info_messages = req.flash('info_messages')
  res.locals.warning_messages = req.flash('warning_messages')
  next()
})

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next)

io.use(wrap(sessionMiddleware))
io.use(wrap(passport.initialize()))
io.use(wrap(passport.session()))

app.use(routes)
socketModule(io, SOCKET_PORT)

server.listen(PORT, () => console.log(`Simple Twitter app listening on port ${PORT}!`))

io.listen(SOCKET_PORT, {
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true
  }
})

module.exports = app

