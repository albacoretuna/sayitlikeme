import React from 'react';
import {PropTypes} from 'react';
import SearchBox from './SearchBox.jsx';

const Search = (props) => <div>
    {!props.hideTitle ? <HeadLine /> : null }
    {props.userNotFound ? <UserNotFound /> : null }
    <SearchBox />
</div>;
Search.propTypes = {
    hideTitle: PropTypes.bool,
    userNotFound: PropTypes.bool
};
export default Search;

const HeadLine = () => <div className="search-container-headline">
    <h4>Or see it in action by clicking on any Twitter handle below:</h4>
</div>;

const UserNotFound = () => <div>
    <h1> URL Not Found </h1>
    <h4> You can search in the box below </h4>
</div>;
