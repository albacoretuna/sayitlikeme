import React from 'react';
import Search from './Search.jsx';
import { Link } from 'react-router';
const Homepage = () => <div>
    <h1> Say It Like Me! </h1>
    <h4> A <strong>free</strong> and <strong>open source</strong> service to record the pronunciation of your name, to help others pronounce it right!</h4>
    <Link to='add-' className="button button-primary"> Register </Link>
    <h4>Record Your name now!  </h4>
    <Search  hideTitle={true}/>
</div>;
export default Homepage;
