/* eslint-env node */
/* router/users.js */
const User = require('../models/user');
const express = require('express');
const router = express.Router();

router.route('/current-user').get(function(req, res) {
    // check if authenticated
    if(req.session.passport && req.session.passport.user) {
        console.log('user in /current-user session', req.session.passport.user);
        // get twitter id from passport.user in session, and look it up in Mongo
        User.find({twitterId:req.session.passport.user.twitterId}, function(err, user) {
            if (err) { return res.sendStatus(500); }
            res.json({ 'status' : { 'success' : {'currentUser': user[0]} } });
        });
    } else {
        res.json({ 'status' : { 'fail' : {'message': 'No user authenticated'} } });
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
            if (err) {
                return res.sendStatus(500);
            }
            return res.sendStatus(200);
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
