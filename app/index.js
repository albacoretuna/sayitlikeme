const React = require('react');
const ReactDom = require('react-dom');
const axios = require('axios');

const App = React.createClass({
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
        this.setState({
            userInfo : {
                twitterId: response.twitterId,
                name: response.name,
                nameClarification: response.nameClarification 
            }
        });
    },
    componentDidMount() {
        axios.get('http://localhost:8000/api-/omidfi')
             .then( data => {
                 console.log('response is back', data);
                 this.showUser(data.data[0]);
             });
    },
    render() {
        return <div>
                  {console.log('this.state', this.state)}
                  <h1> Say It Like Me!</h1>
                  <Description description="I know how it's pronounced!"/>
                  <User userInfo={this.state.userInfo}/>
                  <Search/>
                  <Login />
                  <Recorder />
               </div>;
    }
});


const Search = (props) => <div>
                              <h2>Search:</h2>
                              <input type="text"/>
                              <button>Find</button>
                          </div>;
const Login = (props) => <div>
                             <h2>Login With Twitter </h2>
                             <button> Login </button>
                         </div>;
const User = (props) => <div>
                            {console.log('user props.userInfo', props.userInfo)}
                            <h1>My name is  <b> {props.userInfo.name}</b></h1>
                            <h2>My twitter handle is  <b> {props.userInfo.twitterId}</b></h2>
                            <p>Please call me like this: {props.userInfo.nameClarification}</p>
                            <span>Play</span>
                        </div>;
const Recorder = (props) => <div>
                                <h1> Record the name </h1>
                                <div>Record</div>
                            </div>


const Description = (props) => <div> {props.description} </div>;
ReactDom.render(<App/>, window.document.getElementById('target'));
