/***
 *  auth/auth.js
 *  Helpers for authentication
 **/

/**
 * getCurrentUser
 *
 * @param req
 * @returns {string} the authenticated user's twitter handle  or {undefined}
 */
function getCurrentUser(req) {
    if(req.user) {
        //console.log('user in getcurrentuser', req.session.passport.user);
        return req.user;
    }
    return undefined;
}
module.exports = {
    getCurrentUser: getCurrentUser
};
