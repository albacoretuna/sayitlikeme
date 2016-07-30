import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';

// react components
import MainLayout from './components/MainLayout.jsx';
import AddUser from './components/AddUser.jsx';
import Profile from './components/Profile.jsx';
import Homepage from './components/Homepage.jsx';
import Search from './components/Search.jsx';
import Login from './components/Login.jsx';
import About from './components/About.jsx';
import RemoveAccount from './components/RemoveAccount.jsx';
import Footer from './components/Footer.jsx';


// App is responsible for Routing the whole app
const App = React.createClass({
    render() {
        return (
            <div className="react-root-component">
                <div className="page-wrap">
                    <div className="container">
                        <Router history={browserHistory}>
                            <Route path="/" component={MainLayout}>
                                <IndexRoute component={Homepage} />
                                <Route path="home-" component={Homepage}/>
                                <Route path="search-" component={Search}/>
                                <Route path="add-" component={AddUser}/>
                                <Route path="login-" component={Login}/>
                                <Route path="about-" component={About}/>
                                <Route path="remove-account-" component={RemoveAccount}/>
                                <Route path=":username" component={Profile}/>
                            </Route>
                        </Router>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
});
ReactDom.render(<App/>, window.document.getElementById('target'));
