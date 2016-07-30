/* eslint-env node */
/* router/users.js */
const User = require('../models/user');
const express = require('express');
const router = express.Router();

const logger = require('../logger.js');

router.route('/current-user').get(function(req, res) {
    logger.log('info', 'user in /current-user session', req.session.passport.user);
    // check if authenticated
    if(req.session.passport && req.session.passport.user && typeof req.session.passport.user === 'string') {
        logger.log('info', 'user in /current-user session', req.session.passport.user);
        // get twitter id from passport.user in session, and look it up in Mongo
        res.json({ 'status' : { 'success' : {'currentUser': req.session.passport.user} } });
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
router.route('/users/handles').get(function(req, res) {
    User.find({}, function(err, users) {
        users = users || [];
        if (err) {
            return res.sendStatus(500);
        }
        let usersTwitterHandles = users.map((user)=>user.twitterId);
        res.json({
            'status':
            {'success':
                {'users':
                    usersTwitterHandles
                }
            }
        });
    });
});

module.exports = router;
