import React from 'react';
const Login = () => <div>
    <h2>Login With Twitter </h2>
    <p>This service uses twitter to authenticate users and offer unique URLs to visitors. After registration
        you'll get a url like https://sayitlike.me/YourTwitterHandle where anyone can hear the way you like to
        pronounce your name.
    </p>
    <a className="button button-primary" href="/auth/twitter"> Login With Twitter </a>
    <h4> We won't post anything on your behalf on twitter, we won't keep any login information from you</h4>
</div>;

export default Login;
