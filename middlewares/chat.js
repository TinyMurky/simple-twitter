const chatMiddleware = (req, res, next) => {
  res.locals.layout = 'main'

  next()
}

module.exports = chatMiddleware
