import React from 'react';

const AudioPlayer = (props) => {
    const play = (event) => {
        event.preventDefault();
        let audio = event.target.firstChild;
        audio.play();
    };
    return (
        <div>
            <h4> Listen to how I pronounce it:&nbsp;
            <a href="" className="audio-player-play" onClick={play}>
                <audio>
                    Your browser does not support the <code>audio</code> element.
                    <source src={`./public-/audio-upload/${props.filename}.mp3`} type="audio/mpeg" />
                    <source src={`./public-/audio-upload/${props.filename}.ogg`} type="audio/ogg" />
                    <source src={`./public-/audio-upload/${props.filename}.wav`} type="audio/wav" />
                </audio>
                <strong> ▸ </strong>&nbsp; play
            </a>
        </h4>
        </div>
    );
};
AudioPlayer.propTypes = {
    filename: React.PropTypes.string,
};

export default AudioPlayer;
