const React = require('react');
const ReactDom = require('react-dom');
const axios = require('axios');

const App = React.createClass({
    getInitialState() {
        return {
        twitterId: ''
        }
    },
    componentDidMount() {
        axios.get('http://localhost:8000/omidfi')
             .then( data => {
                 const response = data;
                 console.log();
                 window.myData = data;
                 this.setState({
                     twitterId: response.data[0].twitterId
                 });
             });
    },
    render() {
        return <div>
                  <h1> Say It Like Me! {this.state.twitterId}</h1>
                  <Description description="I know how it's pronounced!"/>
                  <Search/>
                  <Login />
                  <User />
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
                            <h1>My name is  {this.props.twitterId}</h1>
                            <p>Please call me like this</p>
                            <span>Play</span>
                        </div>;
const Recorder = (props) => <div>
                                <h1> Record the name </h1>
                                <div>Record</div>
                            </div>


const Description = (props) => <div> {props.description} </div>;
ReactDom.render(<App/>, window.document.getElementById('target'));
