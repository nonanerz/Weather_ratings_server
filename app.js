let express = require('express')
let path = require('path')
let favicon = require('serve-favicon')
let logger = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')

let index = require('./routes/index')
let users = require('./routes/users')
let ratings = require('./routes/ratings')

let app = express()
let config = require('./config')

require('./db')

app.listen(config.port, () => {
    console.log(`Server running at port: ${config.port}`)
})
app.use(bodyParser.json())
app.use('/api/v1', ratings)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)

app.use(function(req, res, next) {
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
