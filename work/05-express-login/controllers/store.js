const sessions = require('../models/sessions');
const words = require('../models/words');
const helpers = require('../helpers/helpers');

const { INVALID_WORD } = require('../helpers/messages');

// Store endpoint
exports.post = (req, res) => {
    // Get the session id from the cookie
    const sId = req.cookies.sId;

    // Get the word from request body;
    const word = req.body.word;

    if (!helpers.isOneWord(word)) {
        return res.redirect('/?wordError=' + INVALID_WORD);
    }

    // Get username from sessions
    const username = sessions[sId];

    // Update current stored word
    words[username] = word;

    return res.redirect('/');
};