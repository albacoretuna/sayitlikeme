/* eslint-env node */

// to convert wav files uploaded by users to mp3 and ogg regularly on server
const path = require('path');
const child_process = require('child_process');
const AUDIO_FOLDER = path.resolve(__dirname,'../../public-/audio-upload/');
const logger = require('../logger.js');

/**
 * audioConvertor
 *
 * Converts wave to mp3 or ogg,
 * @param {string} fileName
 * @param {string} folder
 * @param {string} codec
 * @param {string} extension
 */
function audioConvertor(fileName, folder, codec, extension) {
    let params = [
        '-i',
        `${folder}/${fileName}.wav`,
        '-y',
        '-acodec',
        codec,
        `${folder}/${fileName}.${extension}`
    ];
    let ffmpegExe = child_process.spawn('ffmpeg', params);

    ffmpegExe.stderr.on('error', (data) => {
        logger.log('info', 'Audio file conversion faild', {error : data, file: fileName});
    });
}

// call audioConvertor once per extension
function convertToAll(fileName) {
    audioConvertor(fileName, AUDIO_FOLDER, 'libmp3lame','mp3');
    audioConvertor(fileName, AUDIO_FOLDER, 'libvorbis','ogg');
}

module.exports = {
    convertToAll : convertToAll
};
