import React from 'react';
import { Link } from 'react-router';
const Navigation = React.createClass({
    propTypes: {
        isLoggedIn: React.PropTypes.bool
    },
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
                        <Link to="/about-"
                            className="navigation-menue-link"
                            activeClassName="navigation-menue-active">
                            About
                        </Link>
                    </li>
                    <div className="navigation-menue-panel">
                        <li className="navigation-menue-item">
                            <Link to="/add-"
                                className="navigation-menue-link"
                                activeClassName="navigation-menue-active">
                                {this.props.isLoggedIn ?'Profile' : 'Register'}
                            </Link>
                        </li>
                        {this.props.isLoggedIn ? <LogoutButton/> : null}
                    </div>
                </ul>
            </div>
        );
    }
});
const LogoutButton = () => <span>
    <li className="navigation-menue-item">
        <Link className="navigation-menue-link" to="remove-account-"> &nbsp; Remove Account </Link>
    </li>
    <li className="navigation-menue-item">
        <a href="/logout-" className="navigation-menue-link">
            Logout
        </a>
    </li>
</span>;
export default Navigation;
