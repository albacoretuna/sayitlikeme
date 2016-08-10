import React from 'react';
import UserDetails from './UserDetails.jsx';
import UrlNotFound from './UrlNotFound.jsx';
import axios from 'axios';
const Profile = React.createClass({
    getInitialState() {
        return {
            userInfo : {
                twitterId: 'Loading...',
                name: 'Loading...'
            }
        };
    },
	//comment here
    showUser(response) {
        if(!response) {
            this.setState({
                userInfo : {
                    twitterId: undefined
                }
            });
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
        axios.get(`/api-/${userName}`)
             .then( response => {
                 this.showUser(response.data[0]);
             });
    },
    render() {
        return (
            <div>
              {this.state.userInfo.twitterId ? <UserDetails userInfo = {this.state.userInfo} /> : <UrlNotFound/>}
            </div>
            );
    }
});

export default Profile;
