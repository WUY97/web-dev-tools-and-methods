const sessions = require('../models/sessions');
const Games = require('../models/games');
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
    const guess = req.body.guess.toUpperCase();
    const game = Games.getGame(username);
    const possible = game.getPossible();
    // Only valid guesses will be processed.
    if (possible.includes(guess)) {
        game.guessWord(guess);
        return res.redirect('/');
    }

    return res.redirect('/?loginError=' + INVALID_USERNAME);
};
