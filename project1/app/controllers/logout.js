// const users = require('../models/users');
const sessions = require('../models/sessions');

// Logout endpoint
exports.post = (req, res) => {
    // Get the session id from the cookie
    const sId = req.cookies.sId;

    // Delete the session from the sessions object
    delete sessions[sId];

    // Clear the session id cookie
    res.clearCookie('sId');

    return res.redirect('/');
};