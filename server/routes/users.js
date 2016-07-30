/* eslint-env node */
/* router/users.js */
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const logger = require('../logger.js');

const getCurrentUser = require('../auth/auth.js').getCurrentUser;

router.route('/current-user').get(function(req, res) {
    // get current authenticated user
    const currentUser = getCurrentUser(req);
    if(currentUser) {
        logger.log('info', 'user in /current-user req.user', currentUser);
        res.json({ 'status' : { 'success' : {'currentUser': currentUser} } });
    } else {
        res.json({ 'status' : { 'fail' : {'message': 'No user authenticated'} } });
    }
});
router.route('/update').post(function(req, res) {
    // check if user is authenticated
    const currentUser = getCurrentUser(req);
    if(!currentUser) {
        return res.sendStatus(403);
    }
    logger.log('info', 'Before twitterId injectin', {'req.body': req.body});
    logger.log('info', 'req.user in /update', {'req.body': req.user});
    const query = {'twitterId':req.user};
    let userInfo = req.body;
    userInfo.twitterId = currentUser;
    User.findOneAndUpdate(
        query,
        userInfo,
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
