import React from 'react';
import axios from 'axios';
const apiUrl = 'http://127.0.0.1:8000';

const AddUser = () => <div>
                                <h1> Add a new user</h1>
                                <div> Here comes a form </div>
                                <AddUserForm/>
                            </div>;
const AddUserForm = React.createClass({
    handleNameChange(event) {
        this.setState({name: event.target.value});
    },
    handleNameClarificationChange(event) {
        this.setState({nameClarification: event.target.value});
    },
    componentDidMount() {
        // TODO complete these
        axios.get(`${apiUrl}/api-/current-user`)
             .then( response => {
                 //console.log('response is back', response);
                 this.showUser(response.data[0]);
             });
    },
    handleSubmit(event) {
        event.preventDefault();
        //console.log('event', event);
        const data =  { twitterId: 'niloo', name: this.state.name, nameClarification: this.state.nameClarification };
        //console.log('name was', data.name);
        axios.post(`${apiUrl}/api-/update`, data);
    },
    sendFormData() {
    },
    render() {
        return (
            <form action="/api/update-" onSubmit={this.handleSubmit}>
                <lable htmlFor="twitter-id">Twitter Handle: </lable> <input name="twitter-id"/>
                <lable htmlFor="name">Name: </lable> <input name="name" onChange={this.handleNameChange}/>
                <lable htmlFor="name-clarification">How to pronounce it? </lable> <input name="name-clarification" onChange={this.handleNameClarificationChange}/>
                <button type="submit">Save</button>
            </form>
               );
    }
});
export default AddUser;
