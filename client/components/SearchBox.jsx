import React from 'react';
import { Link } from 'react-router';

import axios from 'axios';

const SearchBox = React.createClass({
    getInitialState() {
        return {
            twitterHandles :  [],
            searchTerm: ' '
        };
    },
    componentDidMount() {
        axios.get('/api-/users/handles')
            .then( response => {
                let status = response.data.status;
                let users;
                // user is authenticated, should see the audio recording form
                if (status.success) {
                    users = status.success.users;
                    this.setState({twitterHandles : users});
                }
            });
    },
    handleSearchChange(event) {
        this.setState({searchTerm:event.target.value});
    },
    render() {

        let twitterHandles = this.state.twitterHandles;
        let searchTerm = this.state.searchTerm.trim().toLowerCase();
        if(searchTerm.length > 1 ) {
            twitterHandles = twitterHandles.filter((handle) => {
                handle = handle || '@';
                return handle.toLowerCase().match(searchTerm); });
        }
        return (
            <div>
                    <input className="u-full-width" type="text" placeholder="type here to filter by Twitter handle" onChange={this.handleSearchChange}/>
                <div className="twelve columns search-container">
                    <ul className="search-container-list">
                        {twitterHandles.map((user) =>  {
                            return (
                                <li key={user}>
                                    <Link
                                        className="search-container-link"
                                        to={`/${user}`}> {user}
                                    </Link>
                               </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
});
export default SearchBox;
