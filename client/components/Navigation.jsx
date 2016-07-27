import React from 'react';
import { Link } from 'react-router';
const Navigation = React.createClass({
    render() {
        return (
            <div>
                <ul className="navigation">
                    <li><Link to="/home-"> Homepage </Link></li>
                    <li><Link to="/add-"> Register </Link></li>
                </ul>
            </div>
        );
    }
});
export default Navigation;
