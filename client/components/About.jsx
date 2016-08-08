import React from 'react';
const About = () => <div>
    <h1>About</h1>
    <h4> The goal is to get to the point that If you know someone's Twitter handle, you can listen to the way that person pronounces his/her name.</h4>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Dd7FixvoKBw" frameBorder="0" allowFullScreen className="video-iframe"></iframe>
    <h1>Why this?</h1>
    <h4>1. Living with an uncommon name </h4>
    <p>
        Usually people don't get my family name in the first few tries as it's not a common one. Though I have learned not to worry about that, I still feel bad when I see someone struggling to pronounce my name.
    </p>
    <h4>2. Listening to lots of podcasts</h4>
    <p> I like listening to podcasts. One of my favorites is <a href="https://changelog.com/" target="_blank"> The Changelog</a>. It's very common to hear the hosts Adam and Jerod, guessing,  pronouncing, and then apologizing for mispronounciation. But it was when I heard them struggling with my own family name that I decided to do something to help.
    </p>
    <h4>3. Idea  </h4>
    <p> The idea is simply asking people to log in by twitter and <strong>record the pronounciation of their names. </strong>That way others can find the recordings and listen to the right pronounciation.</p>

    <h4>4. Implementation </h4>
    <p>Being mere mortals, we don't always get the chance to bring our ideas to life. But this time I was lucky and during my commutes and Summer vacation I made a beta version of Sayitlike.me </p>
    <p>It's <strong>free</strong> and <strong>open source</strong> hoping that others will help to improve it. All the code is on github: <a href="https://github.com/omidfi/sayitlikeme">Link</a> </p>
    <p> Feel free to say hi on twitter: <a href="https://twitter.com/omidfi">@omidfi</a></p>

</div>;

export default About;
