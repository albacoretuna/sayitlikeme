/* eslint-env node */
const fs = require('fs');
const path = require('path');
const getCurrentUser = require('./auth/auth.js').getCurrentUser;

// module to convert wav to mp3, and ogg
const audioConvertor = require('./utils/audio-convertor.js');
function handleUpload(req, res){
    // user is not authenticated, send permission error
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
            audioConvertor.convertToAll(fileName);
            return res.sendStatus(200);
        }});
}

module.exports = {
    handleUpload: handleUpload
};
