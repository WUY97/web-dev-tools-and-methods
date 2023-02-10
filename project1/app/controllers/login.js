const { v4: uuidv4 } = require('uuid');

const sessions = require('../models/sessions');
const helpers = require('../helpers/helpers');
const game = require('../helpers/game');

const { INVALID_USERNAME } = require('../helpers/messages');

// Login endpoint
exports.post = (req, res) => {
    const { username } = req.body;

    if (!username || username === 'dog' || !helpers.isAlphaNumeric(username)) {
        res.clearCookie('sId');
        return res.redirect('/?loginError=' + INVALID_USERNAME);
    }

    // Generate a new session id
    const sId = uuidv4();

    // Store the session id and user id in the sessions object
    sessions[sId] = username;

    // Send the session id as a cookie to the client
    res.cookie('sId', sId, { httpOnly: true });

    game.continueGame(username);

    return res.redirect('/');
};