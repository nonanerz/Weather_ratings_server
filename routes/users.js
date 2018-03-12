var express = require('express')
var router = express.Router()
var User = require('../model/user/model')

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('da')
  new User({username: 'admin', password: 'qwerty'})
    .save()
    .then(message => {
      res.json({message})
    })
    .catch(next)
})

module.exports = router
