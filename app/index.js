const React = require('react');
const ReactDom = require('react-dom');

const App = React.createClass({
    render() {
        return <div>
                  <h1> Say It Like Me! </h1>
                  <Description description="I know how it's pronounced!"/>
               </div>;
    }
});

const Description = (props) => <div> {props.description} </div>;
ReactDom.render(<App/>, window.document.getElementById('target'));
