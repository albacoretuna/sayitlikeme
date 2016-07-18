import React from 'react';

const AddUser = (props) => <div>
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
    handleSubmit(event) {
        event.preventDefault();
       console.log('event', event);
       let name = event.target.value
       const data =  { twitterId: 'niloo', name: this.state.name, nameClarification: this.state.nameClarification };
       console.log('name was', data.name);
       axios.post(`${apiUrl}/api-/update`, data);
    },
    sendFormData(data) {
    },
    render() {
        return (
            <form action="/api/update-" onSubmit={this.handleSubmit}>
                <lable htmlFor="twitter-id">Twitter Handle: </lable> <input name="twitter-id"/>
                <lable htmlFor="name">Name: </lable> <input name="name" onChange={this.handleNameChange}/>
                <lable htmlFor="name-clarification">How to pronounce it? </lable> <input name="name-clarification" onChange={this.handleNameClarificationChange}/>
                <button type="submit">Save</button>
            </form>
               )
    }
});
export default AddUser;
