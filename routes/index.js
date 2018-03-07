var express = require('express')
var router = express.Router()
var Resource = require('../model/weather-resource/model')

var adminCredentials = require('../credentials/admin')
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.admin === true) {
    let data = []
      Resource.find({})
          .then(resources => {
              data = resources
              res.render('pages/adminPanel', { title: 'Admin panel', resources: data })
          })
          .catch(next)

  } else {
    res.redirect('/login')
  }
})

router.post('/add-resource', function (req, res, next) {
   Resource.create(req.body, function (err) {
        if (err) {
            return next(err)
        } else {
            return res.redirect('/');
        }
    });
})

router.post('/login', function(req, res, next) {
  var data = req.body
  if (data.name === adminCredentials.name && data.password === adminCredentials.password) {
    req.session.admin = true
    res.redirect('/')
  } else {
      res.redirect('/login')
  }
})

router.get('/login', function(req, res, next) {
  res.render('pages/login', { title: 'Sign in', isAdmin: req.session.admin })
})

router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/login');
            }
        });
    }
})

module.exports = router
