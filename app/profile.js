const React = require('react');

const Profile = (props) => <div>
                            {console.log('user props.userInfo', props.userInfo)}
                            <h1>My name is  <b> {props.userInfo.name}</b></h1>
                            <h2>My twitter handle is  <b> {props.userInfo.twitterId}</b></h2>
                            <p>Please call me like this: {props.userInfo.nameClarification}</p>
                            <span>Play</span>
                        </div>;
export default Profile;
                        
