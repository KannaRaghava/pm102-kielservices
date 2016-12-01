var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require("mysql");
// var $ = require("jquery")("/header.hjs");
var router = express.Router();

// First you need to create a connection to the db
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Kiel Services Web Application' });
});

//Login

// var ht = $('#loadContent').load('page1.html');
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Kiel Services Web Application'});
});
router.get('/forgotpassword', function(req, res, next) {
    res.render('forgotpassword', { title: 'Kiel Services Web Application' });
});

router.post('/loginOld', function(req, res, next) {

    res.render('forgotpassword', { title: 'Kiel Services Web Application' });
});

router.get('/chat_box', function(req, res, next) {
    res.render('chat_box', { title: 'Kiel Services Web Application'});
});

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', function(req, res, next) {
    var username = req.param("username");
    var password = req.param("password");

    console.log("user name value: "+ username);
    console.log("password value: "+ password);
    //1 Connect to DB

    //2 insure user exist

    //3 Redirect if user success

    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err)
        if (!user) {
            return res.redirect('/login')
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            res.render('index', { title: 'Kiel Services Web Application' });
        });
    })(req, res, next);
});

passport.use(new LocalStrategy(function(username, password, done) {
    console.log("Login verification " + username + " "  + password);
    console.log("user name value: "+ username);
    console.log("password value: "+ password);

    con.query('SELECT * FROM tbl_user WHERE username = ? and password = ?', [username, password],function(err,rows){
        if(err) {
            console.log('There is an error');
            throw err;
        }

        if (!rows[0])
        {
            console.log("No User");
            return done(null, false, { message: 'Incorrect username.' });
        }
        else
        {
            console.log("User exist" );
            console.log("User id: " + rows[0].password);
            return done(null, rows[0]);
        }
        console.log('Data received from Db:\n');
        console.log(rows);
    });

}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    database.User.findById(id, function(err, user) {
        done(err, user);
    });
});

//ContactUs
router.get('/contactUs', function(req, res, next) {
    res.render('contactUs', {title: 'Kiel Services Web Application'})
})

//About
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Kiel Services Web Application' });
});

module.exports = router;

