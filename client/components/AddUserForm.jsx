import React from 'react';
import AudioRecorder from '../audio-recorder/AudioRecorder.js';
import axios from 'axios';
const apiUrl = 'http://127.0.0.1:8000';
const AddUserForm = React.createClass({
    getInitialState() {
        return {
            isSubmitDisabled: false
        };
    },
    propTypes: {
        currentUser: React.PropTypes.string
    },
    handleNameChange(event) {
        this.setState({name: event.target.value});
    },
    handleNameClarificationChange(event) {
        this.setState({nameClarification: event.target.value});
    },
    handleSubmit(event) {
        event.preventDefault();
        this.setState({isSubmitDisabled: true});
        //console.log('event', event);
        const data =  { twitterId: this.props.currentUser, name: this.state.name, nameClarification: this.state.nameClarification };
        //console.log('name was', data.name);
        axios.post(`${apiUrl}/api-/update`, data)
            .then((response) => response.status === 200 ? this.setState({isSubmitDisabled: false}): null);
    },
    render() {
        return (
            <div>
                <form action="/api/update-" onSubmit={this.handleSubmit}>
                    <h2>Twitter Handle: {this.props.currentUser}</h2>
                    <lable htmlFor="name">Name: </lable> <input name="name" onChange={this.handleNameChange}/>
                    <lable htmlFor="name-clarification">How to pronounce it? </lable> <input name="name-clarification" onChange={this.handleNameClarificationChange}/>
                    <button type="submit" disabled={this.state.isSubmitDisabled}>Save</button>
                </form>
                <AudioRecorder/>
            </div>
        );
    }
});
export default AddUserForm;
