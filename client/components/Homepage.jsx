import React from 'react';
import Search from './Search.jsx';
import { Link } from 'react-router';
const Homepage = () => <div>
     <h1> <img src="img/logo-no-text.svg" className="logo"/>Say it like me! </h1>
    <h4> A <strong>free</strong> and <strong>open source</strong> service to record the pronunciation of your name.</h4>
    <Link to='add-' className="button button-primary"> Get started </Link>
    <Search  hideTitle={false}/>
</div>;
export default Homepage;
