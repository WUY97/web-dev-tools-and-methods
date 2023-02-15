const sessions = require('../models/sessions');
const Games = require('../models/games');
const helpers = require('../helpers/helpers');

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
    const wordLen = game.getWordLen();

    if (
        !guess ||
        !helpers.isAlpha(guess) ||
        !helpers.isOneWord(guess)
    ) {
        return res.redirect('/?guessError=' + "Only one word consists by letters is allowed.");
    }

    // Only valid guesses will be processed.
    if (wordLen !== guess.length || !possible.includes(guess)) {
        return res.redirect('/?guessError=' + "Your entry '" + guess + "' is not in the possible word lists");
    }
    game.guessWord(guess);
    return res.redirect('/');
};
