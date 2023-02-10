const { v4: uuidv4 } = require('uuid');

const sessions = require('../models/sessions');
const helpers = require('../helpers/helpers');
const game = require('../helpers/game');

const { INVALID_USERNAME } = require('../helpers/messages');

// Guess endpoint
exports.post = (req, res) => {
    // Get the session id from the cookie
    const sId = req.cookies.sId;

    if (!sId || !sessions[sId]) {
        // Delete the session from the sessions object
        delete sessions[sId];

        // Clear the session id cookie
        res.clearCookie('sId');

        return res.redirect('/');
    }

    const username = sessions[sId];
    const guess = req.body.guess;
    game.guessWord(username, guess);

    return res.redirect('/');
};
