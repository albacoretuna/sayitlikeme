/* eslint-env node */
const fs = require('fs');
const path = require('path');

// module to convert wav to mp3, and ogg
const audio = require('./utils/audio.js');
/**
 * getCurrentUser
 *
 * @param req
 * @returns {string} the authenticated user's twitter handle  or {undefined}
 */
function getCurrentUser(req) {
    if(req.session && req.session.passport && req.session.passport.user && typeof req.session.passport.user.twitterId === 'string') {
        //console.log('user in getcurrentuser', req.session.passport.user);
        return req.session.passport.user.twitterId;
    }
    return undefined;
}
function handleUpload(req, res){
    // user is not authenticated, send permission error
    //console.log(getCurrentUser(req));
    if(!getCurrentUser(req)) {
        return res.sendStatus(403);
    }
    // based on http://stackoverflow.com/a/24003932/3994190
    const buf = Buffer.from(req.body.blob, 'base64'); // decode
    const fileName = getCurrentUser(req);
    let fullFilePath = path.join(__dirname, '..', '/public-/audio-upload/', fileName + '.wav');
    fs.writeFile(fullFilePath, buf, function(err) {
        if(err) {
            return res.sendStatus(500);
        } else {
            // convert the uploaded wave file to mp3 and ogg
            audio.convertToAll(fileName);
            return res.sendStatus(200);
        }});
}

module.exports = {
    handleUpload: handleUpload
};
