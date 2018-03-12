var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../model/user/model')

passport.use(new LocalStrategy(
  function (username, password, cb) {
    console.log(username, password)
    User.findOne({username})
      .then(user => {
        if (!user) { return cb(null, false) }
        if (user.password != password) { return cb(null, false) }
        return cb(null, user)
      }).catch(e => console.log('error'))
  }
))
passport.serializeUser(function (user, done) {
  done(null, user.username)
})
passport.deserializeUser(function (username, done) {
  done(null, {username: username})
})

module.exports = passport
