let express = require('express');
let path = require('path');
let passport = require('./auth');
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let expressSession = require('express-session')
let Resource = require('../model/weather-resource/model')

//Controllers
let ratings = require('../routes/ratings');

let admin = express(); // the sub app
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
   async function(req, res) {

    let resources = await Resource.find({})
        .then(result => result)
    res.render('home', { user: req.user, resources});

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

admin.post('/resources', function(req, res, next) {
    if (req.user) {
        require('connect-ensure-login').ensureLoggedIn(),
            new Resource(req.body)
                .save()
                .then(res.redirect('/admin'))
                .catch(next)
    } else {
        res.render('login');
    }
});

module.exports = admin;