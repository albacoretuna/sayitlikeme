/* eslint-env node */
const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const User = require('./models/user');
//routes are defined here
const users = require('./routes/users');

// twitter authentication with passport
const passport = require('passport');
const TwitterStrategy  = require('passport-twitter').Strategy;
const secrets = require('./config/secret.js');
//Create the Express app
const app = express();

const dbName = 'usersDb';
const connectionString = 'mongodb://localhost:27017/' + dbName;

const audio = require('./utils/audio.js');

mongoose.connect(connectionString);
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',parameterLimit:50000, extended: true }));

passport.use(new TwitterStrategy({
    consumerKey: secrets.twitterAuth.consumerKey,
    consumerSecret: secrets.twitterAuth.consumerSecret,
    callbackURL: secrets.twitterAuth.callbackURL
},
    function(token, tokenSecret, profile, cb) {
        User.findOne({ twitterId: profile.username }, function (err, user) {
            return cb(err, user);
        });
    })
);


passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
/**
 * getCurrentUser
 *
 * @param req
 * @returns {string} the authenticated user's twitter handle  or {undefined}
 */
function getCurrentUser(req) {
    if(req.session && req.session.passport && req.session.passport.user && typeof req.session.passport.user.twitterId === 'string') {
        console.log('user in getcurrentuser', req.session.passport.user);
        return req.session.passport.user.twitterId;
    }
    return undefined;
}
// logging, parsing, and session handling.
// app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'asdfbasd234SDKJ!@#$@#$', resave: true, saveUninitialized: true  }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//This is our route middleware
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        // console.log('request.session.passport.user in successredirect looks like', req.session.passport.user);
        res.redirect('/add-');
    });
app.use('/api-/', users);
app.use('/public-/', express.static(path.resolve(__dirname,'../public-/')));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.post('/upload-/audio', function(req, res){
    // user is not authenticated, send permission error
    if(!getCurrentUser(req)) {
        return res.sendStatus(403);
    }
    // based on http://stackoverflow.com/a/24003932/3994190
    const buf = Buffer.from(req.body.blob, 'base64'); // decode
    const fileName = getCurrentUser(req);
    let fullFilePath = path.join(__dirname, '..', '/public-/audio-upload/', fileName + '.wav');
    fs.writeFile(fullFilePath, buf, function(err) {
        if(err) {
            return res.sendStatus(500);
        } else {
            // convert the uploaded wave file to mp3 and ogg
            audio.convertToAll(fileName);
            return res.sendStatus(200);
        }});
});
app.use('*',function(req,res) {
    if(req.session.passport) {
        // console.log('request.session.passport.user in get * looks like', req.session.passport.user);
    } else {
        //console.log('passport not defined');
    }
    res.sendFile('index.html', {root: path.resolve(__dirname,'../client/')});
});

module.exports = app;
