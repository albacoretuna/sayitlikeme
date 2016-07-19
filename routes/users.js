/* jshint esversion: 6 */
/* router/users.js */
const User = require('../models/user');
const express = require('express');
const router = express.Router();

router.route('/current-user').get(function(req, res) {
    // check if authenticated
    if(req.session.passport) {
        res.json({'success' : req.session.passport.user});
    } else {
        res.json({'fail':'no user authenticated'});
    }
});
router.route('/update').post(function(req, res) {
    const query = {'twitterId':req.body.twitterId};
    User.findOneAndUpdate(
        query,
        req.body,
        {
            upsert:true
        },
        function(err){
            if (err) return res.send(500, { error: err });
            return res.send('succesfully saved');
        });
});
router.route('/:twitterhandle').get(function(req, res) {
    User.find({twitterId:req.params.twitterhandle}, function(err, users) {
        if (err) {
            return res.send(err);
        }
        res.json(users);
    });
});

module.exports = router;
