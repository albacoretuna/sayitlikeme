import React from 'react';

const AudioPlayer = React.createClass({
    getInitialState() {
        return {
            playing : false
        };
    },
    play(event) {
        event.preventDefault();
        let audio = event.target.firstChild;
        if(audio.paused) {
            audio.play();
            this.setState({
                playing : true
            });
        }
        audio.addEventListener('ended',() => {
            this.setState({
                playing : false
            });
        });
    },
    render() {
        return (
            <div>
                <h4> Listen to how I pronounce it:&nbsp;
                    <a href="" className="audio-player-play" onClick={this.play}>
                        <audio preload="auto">
                            Your browser does not support the <code>audio</code> element.
                            <source src={`./audio-upload/${this.props.filename}.mp3`} type="audio/mpeg" />
                            <source src={`./audio-upload/${this.props.filename}.ogg`} type="audio/ogg" />
                            <source src={`./audio-upload/${this.props.filename}.wav`} type="audio/wav" />
                        </audio>
                        {this.state.playing ? 'playing...' : 'play' }
                    </a>
                </h4>
            </div>
        );
    }
});
AudioPlayer.propTypes = {
    filename: React.PropTypes.string,
};

export default AudioPlayer;
