/* jshint esversion: 6 */
import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { Router, Route, browserHistory} from 'react-router';

// react components
import AddUser from './components/AddUser.jsx';
import Profile from './components/Profile.jsx';
import Homepage from './components/Homepage.jsx';
import Search from './components/Search.jsx';

const apiUrl = 'http://127.0.0.1:8000';


const Description = (props) => <div> {props.description} </div>;

// App is responsible for Routing the whole app
const App = React.createClass({
    render() {
        return (
            <Router history={browserHistory}>
                    <Route path="/" component={Homepage}/>
                    <Route path="/search-" component={Search}/>
                    <Route path="/add-" component={AddUser}/>
                    <Route path="/:username" component={Profile}/>
            </Router>
               )
    }
});
ReactDom.render(<App/>, window.document.getElementById('target'));
