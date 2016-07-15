/* jshint esversion: 6 */
import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { Router, Route, browserHistory} from 'react-router';


const Search = (props) => <div>
                              <h2>Search:</h2>
                              <input type="text"/>
                              <button>Find</button>
                          </div>;
const Signup = (props) => <div>
                             <h2>Signup With Twitter </h2>
                             <button> Signup </button>
                         </div>;
const Recorder = (props) => <div>
                                <h1> Record the name </h1>
                                <div>Record</div>
                            </div>;
const Homepage = (props) => <div>
                                <h1> Home page </h1>
                                <div>Yes this is homepage </div>
                                <Signup />
                            </div>;
const UserDetails = (props) => <div>
                                  {console.log('props in UserDetails', props)}
                                  <h1>My name is  <b>{props.userInfo.name} </b></h1>
                                  <h2>My twitter handle is  <b> {props.userInfo.twitterId}</b></h2>
                                  <p>Please call me like this: {props.userInfo.nameClarification}</p>
                                  <span>Play</span>
                            </div>;

const AddUser = (props) => <div>
                                <h1> Add a new user</h1>
                                <div> Here comes a form </div>
                                <AddUserForm/>
                            </div>;
const AddUserForm = React.createClass({
    handleNameChange(event) {
        this.setState({name: event.target.value});
    },
    handleNameClarificationChange(event) {
        this.setState({nameClarification: event.target.value});
    },
    handleSubmit(event) {
        event.preventDefault();
       console.log('event', event);
       let name = event.target.value
       const data =  { twitterId: 'niloo', name: this.state.name, nameClarification: this.state.nameClarification };
       console.log('name was', data.name);
       axios.post('http://localhost:8080/api-/update', data);
    },
    sendFormData(data) {
    },
    render() {
        return (
            <form action="/api/update-" onSubmit={this.handleSubmit}>
                <lable htmlFor="twitter-id">Twitter Handle: </lable> <input name="twitter-id"/>
                <lable htmlFor="name">Name: </lable> <input name="name" onChange={this.handleNameChange}/>
                <lable htmlFor="name-clarification">How to pronounce it? </lable> <input name="name-clarification" onChange={this.handleNameClarificationChange}/>
                <button type="submit">Save</button>
            </form>
               )
    }
});
const Description = (props) => <div> {props.description} </div>;
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
        axios.get(`http://localhost:8080/api-/${userName}` )
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
