import React from 'react';
import AudioPlayer from './AudioPlayer.jsx';
const UserDetails = (props) => {
    let twitterId = props.userInfo.twitterId;
    let userInfo = props.userInfo;
    return(<div>
        <h1>My name is  <b>{props.userInfo.name} </b></h1>
        <h4>twitter handle <b> <a href={`https://twitter.com/${twitterId}`}> @{twitterId}</a></b></h4>
        <AudioPlayer filename={userInfo.twitterId}/>
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
    <div><h5>Pronounciation hint:</h5> {props.hint}</div>;
const Notes = (props) =>
    <div><h5>Notes: </h5>{props.notes}</div>;
