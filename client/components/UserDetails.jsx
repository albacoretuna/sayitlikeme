import React from 'react';
const UserDetails = (props) => {
    let twitterId = props.userInfo.twitterId;
    return(<div>
        {console.log('props in UserDetails', props)}
        <h1>My name is  <b>{props.userInfo.name} </b></h1>
        <h3>twitter handle <b> <a href={`https://twitter.com/${twitterId}`}> @{twitterId}</a></b></h3>
        <p>Please call me like this: {props.userInfo.nameClarification}</p>
        <AudioPlayer filename={props.userInfo.twitterId}/>
    </div>);
};

UserDetails.propTypes = {
    userInfo: React.PropTypes.shape({
        name: React.PropTypes.string,
        twitterId: React.PropTypes.string,
        nameClarification: React.PropTypes.string
    })
};
const AudioPlayer = (props) => {
    const play = (event) => {
        event.preventDefault();
        let audio = event.target.firstChild;
        audio.play();
    };
    return (
        <div>
            Click to listen how I pronounce it:
            <a href="" onClick={play}>
                <audio>
                    Your browser does not support the <code>audio</code> element.
                    <source src={`./public-/audio-upload/${props.filename}.wav`} type="audio/wav" />
                </audio>
                &nbsp; ▸ play
            </a>
        </div>
    );
};
AudioPlayer.propTypes = {
    filename: React.PropTypes.string,
};
export default UserDetails;
