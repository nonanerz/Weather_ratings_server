var express = require('express')
var router = express.Router()
var adminCredentials = require('../credentials/admin')
var isAdmin = false
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(33333, req.cookies.admin)
  if (req.cookies.admin === 'true') {
    res.render('pages/adminPanel', { title: 'Admin panel' })
  } else {
    res.redirect('/login')
  }
})

router.post('/', function(req, res, next) {
  console.log(2222, req.cookies)
  if (req.cookies.admin === 'true') {
    res.render('pages/adminPanel', { title: 'Admin panel' })
  } else {
    res.redirect('/login')
  }
})

router.post('/login', function(req, res, next) {
  var data = req.body
  if (data.name === adminCredentials.name && data.password === adminCredentials.password) {
    isAdmin = true
    res.cookie('admin', 'true')
    res.redirect('/')
  } else {
    res.render('pages/login', { title: 'Sign in', isAdmin: req.cookies.admin })
  }
})

router.get('/login', function(req, res, next) {
  console.log(isAdmin)
  res.render('pages/login', { title: 'Sign in', isAdmin: req.cookies.admin })
})

router.post('/logout', function(req, res, next) {
  isAdmin = false
  res.cookie('admin', 'false')
  res.redirect('/login')
})

module.exports = router
