
<img src="https://i.imgur.com/8YhEyty.png" width="160">
# sayitlike.me
Are you annoyed by those who can't pronounce your name the way you like it?
Do you get sad when you can't call someone's name with grace?.
Sayitlike.me is an open source effort to solve that problem.

Users can login with their twitter account, record their name, and they'll get a personal URL
like this:
http://sayitlike.me/YourTwitterHandle

That URL can be shared with anyone that need to know how to pronounce the name.

# Help Needed
No matter what technical skills you have, any help would be appreciated. For example with: suggestions for improving the idea, designing a logo, etc... just open an issue and let's talk

## The rest is just development notes
## User stories
  * map sayitlike.me/twitterhandle to a page for @twitterhandle on twitter containing an audio recording of the name
  * user clicks on "Sign up with twitter and record your name", after logging in using twitter, a form shows up,
  asking for name, name clarification,... and those can be saved.

## Authentication
After logging in with twitter, user's redirected to /add- page, a form should be ready with twitter handle filled in. The form can be submitted, when other fields are filled. On server the twitter handle can be compared to the one in session, if it's a match, db can be updated with the data.

## Components
### First phase
  * User registration
  * Login
  * User page, or profile (only with written instruction for pronunciation)
  * Search

### Second Phase
  * Recordings need to be added to users pages

## Mongoose instructions from
https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

## Routing
Requirements
  * all sayitlike.me/twitterHandle, returns to app/index.html
  * all sayitlike.me/api-/twitterHandle, returns JSON, containging user info
  * all static files need to be served from /public as such
  * /api-/add => user registration form
  * /api-/update => update user in db
