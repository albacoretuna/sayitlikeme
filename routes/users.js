var User = require('../models/user');
var express = require('express');
var router = express.Router();

router.route('/users').get(function(req, res) {
    User.find(function(err, movies) {
        if (err) {
            return res.send(err);
        }

        res.json(movies);
    });
});

router.route('/users').post(function(req, res) {
    var user = new User(req.body);

    movie.save(function(err) {
        if(err) {
            return res.send(err);
        }

        res.send({ message: 'User added'});
    });
});
module.exports = router;
