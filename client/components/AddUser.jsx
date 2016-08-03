import React from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import AddUserForm from './AddUserForm.jsx';
import AudioRecorder from '../audio-recorder/AudioRecorder.js';
const apiUrl = '';

const AddUser = React.createClass({
    getInitialState() {
        return {
            userInfo : ''
        };
    },
    propTypes: {
        currentUser: React.PropTypes.string
    },
    componentDidMount() {
        axios.get(`${apiUrl}/api-/current-user`)
            .then( response => {
                let status = response.data.status;
                let currentUser;
                // user is authenticated, should see the audio recording form
                if (status.success) {
                    currentUser = response.data.status.success.currentUser;
                    this.setState({userInfo : currentUser});
                }
            });
    },
    triggerAudioUpload() {
        this.refs.audioRecorder.uploadAudio();
    },
    render() {
        return (
            <div>
                <h1> Profile </h1>
                <h4> Record your name to help people pronounce it more easily! </h4>

                {this.state.userInfo ? <AudioRecorder ref="audioRecorder" twitterId={this.state.userInfo}/> : <Login/>}
                {this.state.userInfo ? <AddUserForm ref="addUserForm" onFromSubmit={this.triggerAudioUpload} currentUser={this.state.userInfo}/> : null}


            </div>);
    }
});
export default AddUser;
