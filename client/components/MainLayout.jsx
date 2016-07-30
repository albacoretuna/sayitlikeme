import React from 'react';
import Navigation from './Navigation.jsx';
import axios from 'axios';
const MainLayout = React.createClass({
    getInitialState() {
        return {
            userInfo : '',
            isLoggedIn: false
        };
    },
    componentDidMount() {
        axios.get('/api-/current-user')
            .then( response => {
                let status = response.data.status;
                let currentUser;
                // user is authenticated, should see the audio recording form
                if (status.success) {
                    currentUser = response.data.status.success.currentUser;
                    this.setState({
                        userInfo : currentUser,
                        isLoggedIn: true
                    });
                }
            });
    },
    propTypes: {
        children: React.PropTypes.element
    },
    render() {
        return (
            <div>
                <Navigation isLoggedIn={this.state.isLoggedIn}/>
                {this.props.children}
            </div>
        );
    }
});
export default MainLayout;
