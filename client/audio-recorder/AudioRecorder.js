// this is shamelessly copied from https://github.com/danrouse/react-audio-recorder and others
import React, { Component, PropTypes } from 'react';
import encodeWAV from './wav-encoder.js';
import axios from 'axios';
const apiUrl = 'http://127.0.0.1:8000';
class AudioRecorder extends Component {
    constructor(props) {
        super(props);

        this.buffers = [[], []];
        this.bufferLength = 0;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
            console.log('Recording not available ', e);
        }
        this.sampleRate = this.audioContext.sampleRate;
        this.recordingStream = null;
        this.playbackSource = null;

        this.state = {
            recording: false,
            playing: false,
            audio: props.audio
        };
    }
    //Stop recording if it's longer than length
    componentWillUpdate(nextProp, nextState) {

        // max recording duration in seconds
        const MAX_DURATION = 10;
        if(nextState.duration >= MAX_DURATION && nextState.recording === true) {
            this.stopRecording();
        }
    }
    componentWillUnmount() {
        this.audioContext.close();
    }
    startRecording() {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        navigator.getUserMedia({ audio: true }, (stream) => {
            const gain = this.audioContext.createGain();
            const audioSource = this.audioContext.createMediaStreamSource(stream);
            audioSource.connect(gain);

            const bufferSize = 2048;
            const recorder = this.audioContext.createScriptProcessor(bufferSize, 2, 2);
            recorder.onaudioprocess = (event) => {
                // save left and right buffers
                for(let i = 0; i < 2; i++) {
                    const channel = event.inputBuffer.getChannelData(i);
                    this.buffers[i].push(new Float32Array(channel));
                    this.bufferLength += bufferSize;
                    this.setState({
                        duration: this.bufferLength / this.sampleRate / 2
                    });
                }
            };

            gain.connect(recorder);
            recorder.connect(this.audioContext.destination);
            this.recordingStream = stream;
            this.recordingStarttime = Date.now();
        }, (err) => {
            console.log(err);

        });

        this.setState({
            recording: true
        });
        if(this.props.onRecordStart) {
            this.props.onRecordStart.call();
        }
    }

    stopRecording() {
        this.recordingStream.getTracks()[0].stop();
        const audioData = encodeWAV(this.buffers, this.bufferLength, this.sampleRate);

        this.setState({
            recording: false,
            audio: audioData

        });

        if(this.props.onChange) {
            this.props.onChange.call(null, {
                duration: this.bufferLength / this.sampleRate,
                blob: audioData
            });
        }
        this.audioContext.suspend();
    }

    startPlayback() {
        if(this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(this.state.audio);
        reader.onloadend = () => {
            this.audioContext.decodeAudioData(reader.result, (buffer) => {
                const source = this.audioContext.createBufferSource();
                source.buffer = buffer;
                source.connect(this.audioContext.destination);
                source.loop = this.props.loop;
                source.start(0);
                source.onended = this.onAudioEnded.bind(this);

                this.playbackSource = source;
            });

            this.setState({
                playing: true
            });

            if(this.props.onPlay) {
                this.props.onPlay.call();
            }
        };
    }

    stopPlayback(event) {
        if(this.state.playing) {
            event.preventDefault();

            this.setState({
                playing: false
            });

            if(this.props.onAbort) {
                this.props.onAbort.call();
            }
        }
    }

    removeAudio() {
        // sorry for this, but couldn't reset the audio blob anyhow, so had to reload the whole page!
        window.location.reload();
    }
    uploadAudio() {
        var blobToBase64 = function(blob, cb) {
            var reader = new FileReader();
            reader.onload = function() {
                var dataUrl = reader.result;
                var base64 = dataUrl.split(',')[1];
                cb(base64);
            };
            reader.readAsDataURL(blob);
        };
        blobToBase64(this.state.audio, function(base64){ // encode
            var data = {'blob': base64};
            axios.post(apiUrl + '/upload-/audio', data).then((resp) => console.log(resp));
        });
    }

    onAudioEnded() {
        if(this.state.playing) {
            this.setState({ playing: false });
        }

        if(this.props.onEnded) {
            this.props.onEnded.call();
        }
        if(this.audioContext.state === 'running') {
            this.audioContext.suspend();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.audio && nextProps.audio !== this.state.audio) {
            this.stopPlayback();
            this.setState({
                audio: nextProps.audio
            });
        }
    }

    render() {
        const strings = this.props.strings;

        let buttonText;
        let buttonClass = ['AudioRecorder-button'];
        let audioButtons;
        let clickHandler;
        if(this.state.audio) {
            buttonClass.push('hasAudio');

            if(this.state.playing) {
                buttonClass.push('isPlaying');
                buttonText = strings.playing;
            } else {
                buttonText = strings.play;
                clickHandler = this.startPlayback;
            }

            audioButtons = [
                <button key="remove" className="AudioRecorder-remove" onClick={this.removeAudio.bind(this)}>{strings.remove}</button>,
                <button key="upload" className="AudioRecorder-upload" onClick={this.uploadAudio.bind(this)}>{strings.upload}</button>
            ];

        } else {
            if(this.state.recording) {
                buttonClass.push('isRecording');
                buttonText = strings.recording;
                clickHandler = this.stopRecording;
            } else {
                buttonText = strings.record;
                clickHandler = this.startRecording;
            }
        }

        return (
            <div className="AudioRecorder" >
                <button
                    className={buttonClass.join(' ')}
                    onClick={clickHandler && clickHandler.bind(this)}
                >
                    {buttonText}
                </button>
                {audioButtons}
            </div>
        );
    }
}

AudioRecorder.propTypes = {
    audio: PropTypes.instanceOf(Blob),
    loop: PropTypes.bool,

    onAbort: PropTypes.func,
    onChange: PropTypes.func,
    onEnded: PropTypes.func,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    onRecordStart: PropTypes.func,

    strings: React.PropTypes.shape({
        play: PropTypes.string,
        playing: PropTypes.string,
        record: PropTypes.string,
        recording: PropTypes.string,
        remove: PropTypes.string,
        upload: PropTypes.string
    })
};

AudioRecorder.defaultProps = {
    loop: false,

    strings: {
        play: '🔊 Play',
        playing: 'Playing...',
        record: '● Record',
        recording: '● Recording... click to stop',
        remove: '✖ Record Again',
        upload: 'Upload'
    }
};

export default AudioRecorder;
