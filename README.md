<img src="https://www.sayitlike.me/img/logo-no-text.svg" width="200">
Sayitlike.me

\xE2\x9D\xA4	

===
Is a free and open source service to help us with pronouncing each other's names. Pleas see it live at: https://SayItLike.Me

Users can login with their twitter account, record their name, and they'll get a personal page
at:
https://sayitlike.me/YourTwitterHandle

That URL can be shared with anyone that need to know how to pronounce that name, it's also possible to search by twitter handles on the website.

# Help Needed
No matter what technical skills you have, any help would be appreciated.
For example in these areas:
  * Code review
  * Suggestions for improving the idea
  * Improving the design

# Contributing

  **Requirements**
  * Mongodb
  * Nodejs
  * nginx

# Installation

```bash
$ git clone git@github.com:omidfi/sayitlikeme.git
$ cd sayitlikeme
$ npm install
```

Make a copy of `server/config/secrets.default.js` and rename it to `secrets.js` in the same folder.

Then run:

```bash
$ npm start # Shortcut to npm run dev and npm run server
```

Now you need a web server to serve static files located at public- folder. It should be setup
to proxy other requests to the nodejs you have already started at http://127.0.0.1:8000, a working sample for
nginx configs is located in server/sample-nginx-development.

After those steps you can start contributiong!
