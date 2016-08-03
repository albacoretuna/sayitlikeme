import React from 'react';
import axios from 'axios';
const apiUrl = '';
const AddUserForm = React.createClass({
    getInitialState() {
        return {
            isSubmitDisabled: false
        };
    },
    handleNameChange(event) {
        this.setState({name: event.target.value});
    },
    propTypes: {
        currentUser: React.PropTypes.string,
        onFromSubmit: React.PropTypes.func
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
        this.props.onFromSubmit();
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
                <div className="row">
                    <div
                        className={'register-step '+ (this.state.formSubmittedSuccess || this.props.currentUser.name ? ' register-step-is-done ' : '')}>
                        <h2> 2. Tell more about it </h2>
                        {/* TODO prefill the form values from database if any*/}
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
                                        Pronunciation hint? (Optional)
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
                                className="button-primary"
                                disabled={this.state.isSubmitDisabled}> Save </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});
export default AddUserForm;
