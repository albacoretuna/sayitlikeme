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
    confirmSubmission(data) {
        if(data.status === 200 ) {
            this.setState({
                isSubmitDisabled: false,
                formSubmittedSuccess: true
            });

        }
    },
    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isSubmitDisabled: true,
            formSubmittedSuccess: true
        });
        const data =  {
            twitterId: this.props.currentUser,
            name: this.state.name,
            nameClarification: this.state.nameClarification
        };
        axios.post(`${apiUrl}/api-/update`, data)
            .then(this.confirmSubmission);
    },
    render() {
        return (
            <div>
                <h3>
                    Your Twitter handle:
                    <b>
                    <a href={`https://twitter.com/${this.props.currentUser}`}> @{this.props.currentUser}</a>
                    </b>
                </h3>
                <div className={'register-step '+ (this.state.formSubmittedSuccess ? ' register-step-is-done ' : '')}>
                    <h2> 1. Enter Your Name </h2>
                    <form action="/api/update-" onSubmit={this.handleSubmit}>
                        <lable htmlFor="name">Name: </lable>
                        <input name="name" onChange={this.handleNameChange}/>
                        <lable htmlFor="name-clarification">How to pronounce it? </lable>
                        <input name="name-clarification" onChange={this.handleNameClarificationChange}/>
                        <button type="submit" disabled={this.state.isSubmitDisabled}>Save</button>
                    </form>
                    <FormSuccessMessage shouldHide={!this.state.formSubmittedSuccess}/>
                </div>
                <AudioRecorder/>
            </div>
        );
    }
});
const FormSuccessMessage = (props) => <div className={props.shouldHide ? 'is-hidden' : ''}>
    Form Submitted Successfully! Now record the pronounciation!
</div>;
export default AddUserForm;
