var express = require('express');
var path = require('path');
var passport = require('./auth');
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let expressSession = require('express-session')

//Controllers
var ratings = require('../routes/ratings');

var admin = express(); // the sub app
admin.use(bodyParser.urlencoded({ extended: false }));
admin.use(bodyParser.json());
admin.use('/ratings', ratings);
admin.use(expressSession({
    secret: 'thisisagreatgreatsecretforthesession',
    resave: true,
    saveUninitialized: true
}));
admin.use(passport.initialize());
admin.use(passport.session());

admin.use(cookieParser('thisisagreatgreatsecretforthesession'));

admin.get('/',
    function(req, res) {
        res.render('home', { user: req.user });
    });

admin.get('/login',
    function(req, res){
        res.render('login');
    });

admin.post('/login',
    passport.authenticate('local', { failureRedirect: '/admin/login' }),
    function(req, res) {
        res.redirect('/admin');
    });

admin.get('/logout',
    function(req, res){
        req.logout();
        res.redirect('/admin/');
    });

admin.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        res.render('profile', { user: req.user });
    });

module.exports = admin;