import React from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import AddUserForm from './AddUserForm.jsx';
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
                let status = response.data.status;
                // user is authenticated, should see the audio recording form
                if (status.success) {
                    this.setState({userInfo : {twitterId: response.data.status.success.currentUser}});
                }
            });
    },
    render() {
        return (
            <div>
                <h1> Register And Record Pronounciation </h1>

                {this.state.userInfo.twitterId ? <AddUserForm currentUser={this.state.userInfo.twitterId}/> : <Login/>}

            </div>);
    }
});
export default AddUser;
