import React from 'react';
import Navigation from './Navigation.jsx';
const MainLayout = React.createClass({
    propTypes: {
        children: React.PropTypes.element
    },
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
