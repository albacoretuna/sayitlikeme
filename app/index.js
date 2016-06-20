const React = require('react');
const ReactDom = require('react-dom');

const App = React.createClass({
    render() {
        return <h1> Say It Like Me </h1>;
    }
});

ReactDom.render(<App/>, window.document.getElementById('target'));
