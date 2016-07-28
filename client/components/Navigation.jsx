import React from 'react';
import { Link } from 'react-router';
const Navigation = React.createClass({
    render() {
        return (
            <div>
                <ul className="navigation-menue">
                    <li className="navigation-menue-item">
                        <Link to="/home-"
                            className="navigation-menue-link"
                            activeClassName="navigation-menue-active">
                            Homepage
                        </Link>
                    </li>
                    <li className="navigation-menue-item">
                        <Link to="/add-"
                            className="navigation-menue-link"
                            activeClassName="navigation-menue-active">
                            Register
                        </Link>
                    </li>
                    <li className="navigation-menue-item">
                        <Link to="/about-"
                            className="navigation-menue-link"
                            activeClassName="navigation-menue-active">
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
});
export default Navigation;
