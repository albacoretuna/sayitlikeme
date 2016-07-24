import React from 'react';
import UserDetails from './UserDetails.jsx';
import Search from './Search.jsx';
import axios from 'axios';
const apiUrl = 'http://127.0.0.1:8000';
const Profile = React.createClass({
    getInitialState() {
        return {
            userInfo : {
                twitterId: ''
            }
        }
    },
    showUser(response) {
        if(!response) {
            return;
        }
        this.setState({
            userInfo : {
                twitterId: response.twitterId,
                name: response.name,
                nameClarification: response.nameClarification
            }
        });
    },
    componentDidMount() {
        let userName = this.props.params.username;
        axios.get(`${apiUrl}/api-/${userName}`)
             .then( response => {
                 console.log('response is back', response);
                 this.showUser(response.data[0]);
             });
    },
    render() {
        return (
            <div>
              {console.log('state.userInfo.name', typeof this.state.userInfo.name )}
              {console.log('params', this.props.params.username )}
              {this.state.userInfo.name ? <UserDetails userInfo = {this.state.userInfo} /> : <Search/>}
            </div>
            )
    }
});

export default Profile;
