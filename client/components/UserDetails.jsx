import React from 'react';
import AudioPlayer from './AudioPlayer.jsx';
const UserDetails = (props) => {
    let twitterId = props.userInfo.twitterId;
    let userInfo = props.userInfo;
    return(<div>
        <h1>My name is  <b>{props.userInfo.name} </b></h1>
        <h4>twitter handle <b> <a href={`https://twitter.com/${twitterId}`}> @{twitterId}</a></b></h4>
        {userInfo.hasAudio ? <AudioPlayer filename={userInfo.twitterId}/> : <NoAudioRecorded />}
        {userInfo.nameClarification ? <PronounicationHint hint={userInfo.nameClarification}/> : null}
        {userInfo.notes ? <Notes notes={userInfo.notes}/> : null}
    </div>);
};

UserDetails.propTypes = {
    userInfo: React.PropTypes.shape({
        name: React.PropTypes.string,
        twitterId: React.PropTypes.string,
        nameClarification: React.PropTypes.string
    })
};
export default UserDetails;

const PronounicationHint = (props) =>
    <div><h5>Pronunciation hint:</h5> {props.hint}</div>;
const NoAudioRecorded = () =>
    <div><h5>I haven't recorded the pronunciation yet, please come back later</h5></div>;
const Notes = (props) =>
    <div><h5>Notes: </h5>{props.notes}</div>;
