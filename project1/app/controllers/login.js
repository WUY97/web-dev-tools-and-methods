const { v4: uuidv4 } = require('uuid');

const sessions = require('../models/sessions');

// Login endpoint
exports.post = (req, res) => {
    const { username } = req.body;

    // Generate a new session id
    const sId = uuidv4();

    // Store the session id and user id in the sessions object
    sessions[sId] = username;

    // Send the session id as a cookie to the client
    res.cookie('sId', sId, { httpOnly: true });

    return res.redirect('/');
};
