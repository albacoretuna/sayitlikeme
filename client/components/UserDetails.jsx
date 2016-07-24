import React from 'react';
const UserDetails = (props) => <div>
                                  {console.log('props in UserDetails', props)}
                                  <h1>My name is  <b>{props.userInfo.name} </b></h1>
                                  <h2>My twitter handle is  <b> {props.userInfo.twitterId}</b></h2>
                                  <p>Please call me like this: {props.userInfo.nameClarification}</p>
                                  <span>Play</span>
                            </div>;

export default UserDetails;
