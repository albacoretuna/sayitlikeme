/* jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes are defined here
const users = require('./routes/users');

//Create the Express app
const app = express();

const dbName = 'usersDb';
const connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//This is our route middleware
app.use('/api-/', users);
app.use('/public-/', express.static(__dirname + '/public-'));
app.use('*',function(req,res) {
    res.sendFile(__dirname +'/app/index.html');
});
module.exports = app;
