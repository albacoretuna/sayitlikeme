// this is shamelessly copied from https://github.com/danrouse/react-audio-recorder and others
import React, { Component, PropTypes } from 'react';
import encodeWAV from './wav-encoder.js';
import axios from 'axios';
class AudioRecorder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recording: false,
            audioRecordingIsSupported: true,
            playing: false,
            audio: props.audio
        };

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

    }
    //Stop recording if it's longer than length
    componentWillUpdate(nextProp, nextState) {

        // max recording duration in seconds
        const MAX_DURATION = 6;
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
        if(typeof navigator.getUserMedia !== 'function') {
            this.setState({
                audioRecordingIsSupported: false
            });

            // send error to GA
            window.ga('send', 'event', 'JavaScript Errors', 'getUserMedia Not Found', ' ', {
                nonInteraction: true
            });
            return;
        }
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
    confirmUpload(data) {
        if(data.status === 200 ) {
            this.setState({
                fileUploadSuccess: true
            });

        }
    }
    uploadAudio() {
        if(!this.state.audio) {
            return;
        }
        var blobToBase64 = function(blob, cb) {
            var reader = new FileReader();
            reader.onload = function() {
                var dataUrl = reader.result;
                var base64 = dataUrl.split(',')[1];
                cb(base64);
            };
            reader.readAsDataURL(blob);
        };
        var _self = this;
        blobToBase64(this.state.audio, function(base64){ // encode
            var data = {'blob': base64};
            axios.post('/upload-/audio', data).then(_self.confirmUpload.bind(_self));
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
        let buttonClass = ['audiorecroder-button'];
        let audioButtons;
        let clickHandler;
        if(this.state.audio) {
            buttonClass.push('has-audio');

            if(this.state.playing) {
                buttonClass.push('is-playing');
                buttonText = strings.playing;
            } else {
                buttonText = strings.play;
                clickHandler = this.startPlayback;
            }

            audioButtons = [
                <button key="remove" className="audiorecorder-remove" onClick={this.removeAudio.bind(this)}>{strings.remove}</button>,
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
            <div>
                <h5>
                    Your Twitter handle: &nbsp;
                            @{this.props.twitterId}
                    <a href="/logout-"> (Change User) </a>
                </h5>
                <h6>Follow steps 1 and 2, your device needs to have a microphone</h6>
            <AudioRecordingNotSupported isVisible={!this.state.audioRecordingIsSupported}/>
            <div className={'audio-recorder' + (this.state.audioRecordingIsSupported ? '' : ' is-hidden ')}>
                <div className={'register-step ' + (this.state.audio ? 'register-step-is-done ' : '')}>
                    <h2> 1. Record your name </h2>
                    <div>Press ● Record when you're ready, and then pronounce your name clearly </div>
                <button
                    className={buttonClass.join(' ')}
                    onClick={clickHandler && clickHandler.bind(this)}
                >
                    {buttonText}
                </button>
                {audioButtons}
                </div>
                <div className={'profile-created-overlay ' + (!this.state.fileUploadSuccess ? 'is-hidden' : '')}>
                    <div className="container">
                        <div className="ten columns">
                            <h3>
                                Congrats! Registration is complete. You can check your page at &nbsp;
                                <a className="profile-created-overlay-link" href={'/'+this.props.twitterId}>
                                    &nbsp; https://sayitlike.me/{this.props.twitterId}
                                </a>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
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

    twitterId: PropTypes.string,
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
const AudioRecordingNotSupported = (props) => <div className={(props.isVisible ? '' : 'is-hidden')}>
    <h1> Oh sorry! something's wrong with audio recording </h1>
    <h3>Please try registering using latest
        Chrome or Firefox browsers on a desktop, laptop, or any Android phone or tablet </h3>
</div>;
AudioRecordingNotSupported.propTypes = {
    isVisible: PropTypes.bool
};
export default AudioRecorder;
