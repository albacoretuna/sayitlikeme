/* eslint-env node */
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const User = require('./models/user');
//routes are defined here
const users = require('./routes/users');

const logger = require('./logger.js');
const morgan = require('morgan');

// twitter authentication with passport

const passport = require('passport');
const TwitterStrategy  = require('passport-twitter').Strategy;
const secrets = require('./config/secret.js');

const audioUploader = require('./audio-uploader.js');

//Create the Express app
const app = express();

const dbName = secrets.db.dbName;
const connectionString = secrets.db.mongoHost + dbName;


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
function(token, tokenSecret, profile, done) {
    if(typeof profile.username === 'string') {
        profile.username = profile.username.toLowerCase();
    }
logger.log('info', 'profile from twitter arrived', {profile: profile});
    var searchQuery = {
      twitterId: profile.username
    };

    var updates = {
      name: profile.displayName
    };

    var options = {
      upsert: true,
      new: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        if(user) {
        return done(null, user);
        }
      }
    });
  }
));


passport.serializeUser(function(user, done) {
    // logger.log('info', 'user id serializsed as: ', {id: user.twitterId});
    done(null, user.twitterId);
});

passport.deserializeUser(function(obj, done) {
    // logger.log('info', 'user deserializsed as: ', {user: obj});
    done(null, obj);
});
// parsing, and session handling.
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('morgan')('dev'));
let sessionOptions = {
    secret: secrets.session.secret,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 20}
};

// in production enable secure cookie and set domain, also nginx needs
// proxy_set_header X-Forwarded-Proto $scheme;
if (app.get('env') === 'production') {
    sessionOptions.name = 'saySessionId';
    sessionOptions.proxy = true;
    app.set('trust proxy', 'loopback');
    sessionOptions.cookie.domain = 'sayitlike.me';
    sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));




// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//This is our route middleware
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login-' }),
    function(req, res) {
        logger.info('info', 'In success func callback');
        // Successful authentication, redirect to registration form.
        res.redirect('/add-');
    });
app.get('/logout-', function(req, res){
    req.logout();
    res.redirect('/login-');
});
app.use('/api-/', users);
app.post('/upload-/audio', audioUploader.handleUpload);
app.use('*',function(req,res) {
    res.sendFile('index.html', {root: path.resolve(__dirname,'../public-/')});
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    logger.log('error', 'Following happened',{
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
    logger.log('error', 'Following happened',{
      message: err.message,
      error: err
  });
});

module.exports = app;
