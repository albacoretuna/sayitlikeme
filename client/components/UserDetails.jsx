import React from 'react';
import AudioPlayer from './AudioPlayer.jsx';
const UserDetails = (props) => {
    let twitterId = props.userInfo.twitterId;
    let userInfo = props.userInfo;
    return(<div>
        <h1>My name is  <b>{props.userInfo.name} </b></h1>
        <label>Twitter handle <b> <a href={`https://twitter.com/${twitterId}`}> @{twitterId}</a></b></label>
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
    <div><label>Pronunciation hint:</label> {props.hint}</div>;
const NoAudioRecorded = () =>
    <div><label>I haven't recorded the pronunciation yet, please come back later</label></div>;
const Notes = (props) =>
    <div><label>Notes: </label>{props.notes}</div>;
