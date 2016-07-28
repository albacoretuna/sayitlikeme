import React from 'react';
import Search from './Search.jsx';
const Homepage = () => <div>
    <h1> Home page </h1>
    <h5> Sayitlike.me is a free service to record the pronounciation of names of people or products, to help others pronounce it like the owners of those names </h5>
    <p>Check some recorded names below, or go ahead and record a name! </p>
    <Search  hideTitle={true}/>
</div>;
export default Homepage;
