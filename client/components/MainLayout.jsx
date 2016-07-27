import React from 'react';
import { Link } from 'react-router';
import Navigation from './Navigation.jsx';
const MainLayout = React.createClass({
    render() {
        return (
            <div>
                <Navigation />
                {this.props.children}
            </div>
        );
    }
});
export default MainLayout;
