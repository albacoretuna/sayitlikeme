import React from 'react';
import axios from 'axios';
import Signup from './Signup.jsx';
import AudioRecorder from '../audio-recorder/AudioRecorder.js';
const apiUrl = 'http://127.0.0.1:8000';

const AddUser = React.createClass({
    getInitialState() {
        return {
            userInfo : {
                twitterId: ''
            }
        };
    },
    componentDidMount() {
        axios.get(`${apiUrl}/api-/current-user`)
            .then( response => {
                //this.showUser(response.data[0]);
                if('fail' in response.data) {
                    console.log('user not authenticated', response);
                }
                if ('success' in response.data) {
                    this.setState({userInfo : {twitterId: response.data.success}});
                }
            });
    },
    render() {
        return (
            <div>
                <h1> Add a new user</h1>

                {this.state.userInfo.twitterId ? <AddUserForm currentUser={this.state.userInfo.twitterId}/> : <Signup/>}
                <span className="success-registration-is-hidden">Registration Successfull</span>

            </div>);
    }
});
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
export default AddUser;
