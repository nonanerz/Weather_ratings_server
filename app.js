let express = require('express')
let path = require('path')
let favicon = require('serve-favicon')
let logger = require('morgan')
let bodyParser = require('body-parser')
var admin = require('./admin/app')

let users = require('./routes/users')
let ratings = require('./routes/ratings')
let resources = require('./routes/weather-rating')
let comments = require('./routes/comments')
let sendEmail = require('./routes/send-email')

let app = express()
let config = require('./config')
app.use('/', admin) // mount the sub app

require('./db')

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}`)
})
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/users', users)
app.use('/api/ratings', ratings)
app.use('/api/resources', resources)
app.use('/api/comments', comments)
app.use('/api/send-email', sendEmail)

app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((req, res, next) => {
  const err = new Error(`Not Found ${req.path}`)
  err.status = 404
  next(err)
})
app.use((error, req, res, next) => {
  if (error) {
    console.log(error)
    return res.status(400).json({error})
  }
  next(error)
})
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
