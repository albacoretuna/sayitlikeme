import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { Router, Route, browserHistory} from 'react-router';


const Search = (props) => <div>
                              <h2>Search:</h2>
                              <input type="text"/>
                              <button>Find</button>
                          </div>;
const Login = (props) => <div>
                             <h2>Login With Twitter </h2>
                             <button> Login </button>
                         </div>;
const Recorder = (props) => <div>
                                <h1> Record the name </h1>
                                <div>Record</div>
                            </div>;
const Homepage = (props) => <div>
                                <h1> Home page </h1>
                                <div>Yes this is homepage </div>
                            </div>;


const Description = (props) => <div> {props.description} </div>;
const Profile = React.createClass({
    getInitialState() {
        return {
            userInfo : {
                twitterId: '',
                name: '',
                nameClarification: ''
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
        axios.get(`http://localhost:8000/api-/${userName}` )
             .then( data => {
                 console.log('response is back', data);
                 this.showUser(data.data[0]);
             });
    },
    render() {
        return ( 
            <div>
              {console.log('state', this.state )}
              {console.log('params', this.props.params.username )}
              <h1>My name is  <b>{this.state.userInfo.name} </b></h1>
              <h2>My twitter handle is  <b> {this.state.userInfo.twitterId}</b></h2>
              <p>Please call me like this: {this.state.userInfo.nameClarification}</p>
              <span>Play</span>
            </div>
            )     
    }
});

// App is responsible for Routing the whole app
const App = React.createClass({
    render() {
        return ( 
            <Router history={browserHistory}>
                    <Route path="/" component={Homepage}/>
                    <Route path="/search-" component={Search}/>
                    <Route path="/:username" component={Profile}/>
            </Router>
               )     
    }
});
ReactDom.render(<App/>, window.document.getElementById('target'));
