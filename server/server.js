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
        // console.log(JSON.stringify(profile));
        User.findOne({ twitterId: profile.username }, function (err, user) {
             //  console.log(JSON.stringify(user));
            return cb(err, user);
        });
        /*
        User.findOneAndUpdate(
            {'twitterId':profile.username},
            user,
            {
                upsert:true
            },
            function(err, user){
                if (err) return res.send(500, { error: err });
                return cb(err, user);
            });
         */
    })
);


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
    cb(null, user.twitterId);
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
    if(req.session && req.session.passport && typeof req.session.passport.user === 'string') {
        return req.session.passport.user;
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
    const buf = Buffer.from(req.body.blob, 'base64'); // decode
    const fileName = getCurrentUser(req);
    let fullFilePath = path.join(__dirname, '..', '/public-/audio-upload/', fileName + '.wav');
    fs.writeFile(fullFilePath, buf, function(err) {
        if(err) {
            console.log('err', err);
        } else {
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
