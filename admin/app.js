let express = require('express')
let passport = require('./auth')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let expressSession = require('express-session')
let Resource = require('../model/weather-resource/model')
const fileUpload = require('express-fileupload')

// Controllers
let ratings = require('../routes/ratings')

let admin = express()

admin.use(fileUpload())
admin.use(bodyParser.urlencoded({ extended: false }))
admin.use(bodyParser.json())
admin.use('/ratings', ratings)
admin.use(expressSession({
  secret: 'thisisagreatgreatsecretforthesession',
  resave: true,
  saveUninitialized: true
}))
admin.use(passport.initialize())
admin.use(passport.session())

admin.use(cookieParser('thisisagreatgreatsecretforthesession'))

admin.get('/', async function (req, res) {
  if (req.user) {
    let resources = await Resource.find({})
      .sort('-_id')
      .then(result => result)
    res.render('home', { user: req.user, resources})
  } else {
    res.render('login', {user: req.user})
  }
})

admin.get('/login',
  function (req, res) {
    res.render('login')
  })

admin.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  })

admin.get('/logout',
  function (req, res) {
    req.logout()
    res.redirect('/login')
  })

admin.post('/resources', function (req, res, next) {
  let path

  if (req.files.file) {
    let randomNum = Math.floor(Math.random() * 100000)
    path = 'public/' + randomNum + req.files.file.name
    req.body.file = '/' + randomNum + req.files.file.name
  }
  if (req.user) {
    require('connect-ensure-login').ensureLoggedIn(),
    req.files.file.mv(path)

    new Resource(req.body)
      .save()
      .then(res.redirect('/'))
      .catch(next)
  } else {
    res.render('login')
  }
})

admin.get('/resources/:id/remove', function (req, res, next) {
  if (req.user) {
    require('connect-ensure-login').ensureLoggedIn(),
    Resource.remove({ _id: req.params.id }, function (err) {
      res.redirect('/')
    })
  } else {
    res.render('login')
  }
})

admin.get('/resources/:id/edit', async function (req, res, next) {
  if (req.user) {
    let resource = await Resource.findOne({ _id: req.params.id })
      .then(result => result)
    require('connect-ensure-login').ensureLoggedIn(),
    res.render('edit', { user: req.user, resource: resource })
  } else {
    res.render('login', {user: req.user})
  }
})

admin.post('/resources/:id/edit', async function (req, res, next) {
    let path

    if (req.files.file) {
        let randomNum = Math.floor(Math.random() * 100000)
        path = 'public/' + randomNum + req.files.file.name
        req.body.file = '/' + randomNum + req.files.file.name
        req.files.file.mv(path)
    }
  if (req.user) {
      require('connect-ensure-login').ensureLoggedIn(),
    Resource.findOneAndUpdate({ _id: req.params.id }, req.body, {upsert: true}, function (err, doc) {
      res.redirect('/')
    })
  } else {
    res.render('login', {user: req.user})
  }
})

module.exports = admin
