/* router/users.js */
var User = require('../models/user');
var express = require('express');
var router = express.Router();

router.route('/:twitterhandle').get(function(req, res) {
    User.find({twitterId:req.params.twitterhandle}, function(err, users) {
        if (err) {
            return res.send(err);
        }

        res.json(users);
    });
});

router.route('/').post(function(req, res) {
    var user = new User(req.body);

    user.save(function(err) {
        if(err) {
            return res.send(err);
        }

        res.send({ message: 'User added'});
    });
});
module.exports = router;
