/* eslint-env node */

// to convert wav files uploaded by users to mp3 and ogg regularly on server
const exec = require('child_process').exec;
const path = require('path');
const AUDIO_FOLDER = path.resolve(__dirname,'../../public-/audio-upload/');

// a general error logger
function puts(error) {
    if(error) {
        console.log(error);
    }
}
function waveToMP3(fileName) {
    exec(`cd  ${AUDIO_FOLDER}  && ffmpeg -i ${fileName}.wav -y -acodec libmp3lame ${fileName}.mp3`, puts);
}
function waveToOGG(fileName) {
    exec(`cd  ${AUDIO_FOLDER}  && ffmpeg -i ${fileName}.wav -y -acodec libvorbis ${fileName}.ogg`, puts);
}

function convertToAll(fileName) {
    waveToMP3(fileName);
    waveToOGG(fileName);
}

module.exports = {
    convertToAll : convertToAll
};
