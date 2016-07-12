/* jshint esversion: 6 */
/* router/users.js */
const User = require('../models/user');
const express = require('express');
const router = express.Router();

router.route('/:twitterhandle').get(function(req, res) {
    User.find({twitterId:req.params.twitterhandle}, function(err, users) {
        if (err) {
            return res.send(err);
        }

        res.json(users);
    });
});

router.route('/update').post(function(req, res) {
    const query = {'twitterId':req.body.twitterId};
    User.findOneAndUpdate(
            query,
            req.body,
            {
                upsert:true
            },
            function(err, doc){
                if (err) return res.send(500, { error: err });
                return res.send("succesfully saved");
            });
});
module.exports = router;
