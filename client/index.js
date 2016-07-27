import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory} from 'react-router';

// react components
import MainLayout from './components/MainLayout.jsx';
import AddUser from './components/AddUser.jsx';
import Profile from './components/Profile.jsx';
import Homepage from './components/Homepage.jsx';
import Search from './components/Search.jsx';


// App is responsible for Routing the whole app
const App = React.createClass({
    render() {
        return (
            <div>
                <Router history={browserHistory}>
                    <Route path="/" component={MainLayout}>
                        <Route path="home-" component={Homepage}/>
                        <Route path="search-" component={Search}/>
                        <Route path="add-" component={AddUser}/>
                        <Route path=":username" component={Profile}/>
                    </Route>
                </Router>
            </div>
        );
    }
});
ReactDom.render(<App/>, window.document.getElementById('target'));
