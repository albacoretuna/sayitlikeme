import React from 'react';
import UserDetails from './UserDetails.jsx';
import Search from './Search.jsx';
import axios from 'axios';
const apiUrl = '';
const Profile = React.createClass({
    getInitialState() {
        return {
            userInfo : {
                twitterId: ''
            }
        };
    },
    showUser(response) {
        if(!response) {
            return;
        }
        this.setState({
            userInfo : {
                twitterId: response.twitterId,
                name: response.name,
                nameClarification: response.nameClarification,
                notes: response.notes,
                hasAudio: response.hasAudio
            }
        });
    },
    componentDidMount() {
        let userName = this.props.params.username;
        axios.get(`${apiUrl}/api-/${userName}`)
             .then( response => {
                 this.showUser(response.data[0]);
             });
    },
    render() {
        return (
            <div>
              {this.state.userInfo.twitterId ? <UserDetails userInfo = {this.state.userInfo} /> : <Search userNotFound= {true} hideTitle={true}/>}
            </div>
            );
    }
});

export default Profile;
