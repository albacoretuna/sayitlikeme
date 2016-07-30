import React from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import AddUserForm from './AddUserForm.jsx';
const apiUrl = '';

const AddUser = React.createClass({
    getInitialState() {
        return {
            userInfo : ''
        };
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
    render() {
        return (
            <div>
                <h1> Profile </h1>
                <h4> Record your name to help people pronounce it more easily! </h4>

                {this.state.userInfo ? <AddUserForm currentUser={this.state.userInfo}/> : <Login/>}

            </div>);
    }
});
export default AddUser;
