import React from 'react';
import AudioRecorder from '../audio-recorder/AudioRecorder.js';
import axios from 'axios';
const apiUrl = '';
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
    handleNotesChange(event) {
        this.setState({notes: event.target.value});
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
            nameClarification: this.state.nameClarification,
            notes: this.state.notes
        };
        axios.post(`${apiUrl}/api-/update`, data)
            .then(this.confirmSubmission);
    },
    render() {
        return (
            <div>
                <h5>
                    For Twitter handle: &nbsp;
                    <a href={`https://twitter.com/${this.props.currentUser}`}>
                        @{this.props.currentUser}
                    </a>
                </h5>
                <h6>Follow these 3 steps</h6>
                <div className="row">
                    <div
                        className={'register-step '+ (this.state.formSubmittedSuccess || this.props.currentUser.name ? ' register-step-is-done ' : '')}>
                        <h2> 1. Enter Your Name </h2>
                        <form action="/api/update-" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="six columns">
                                    <label htmlFor="name">Name* </label>
                                    <input name="name"
                                        type="text"
                                        onChange={this.handleNameChange}
                                        required/>
                                </div>
                                <div className="six columns">
                                    <label htmlFor="name-clarification">
                                        Pronounciation hint? (Optional)
                                    </label>
                                    <input
                                        name="name-clarification"
                                        type="text"
                                        onChange={this.handleNameClarificationChange}
                                        placeholder="e.g. rhymes with Sun"/>
                                </div>
                                <label htmlFor="notes">Notes (Optional)</label>
                                <textarea
                                    name="notes"
                                    className="u-full-width"
                                    onChange={this.handleNotesChange}
                                    placeholder="e.g I prefer my friends to use my first name. Or my aunt Jane chose this name for me">
                                </textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={this.state.isSubmitDisabled}> Save </button>
                        </form>
                        <FormSuccessMessage shouldHide={!this.state.formSubmittedSuccess}/>
                    </div>
                    <AudioRecorder twitterId={this.props.currentUser}/>
                </div>
            </div>
        );
    }
});
const FormSuccessMessage = (props) => <div className={props.shouldHide ? 'is-hidden' : ''}>
    Form Submitted Successfully! Now record the pronounciation!
</div>;
FormSuccessMessage.propTypes = {
    shouldHide: React.PropTypes.bool
};
export default AddUserForm;
