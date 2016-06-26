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

/*
var query = {'username':req.user.username};
req.newData.username = req.user.username;
MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
});
 */
router.route('/').post(function(req, res) {
    var query = {'twitterId':req.body.twitterId};

    User.findOneAndUpdate(query, req.body, {upsert:true, setDefaultsOnInsert:true, runValidators:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    });
});
module.exports = router;
