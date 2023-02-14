const sessions = require('../models/sessions');
const Games = require('../models/games');

// New game endpoint
exports.post = (req, res) => {
    const sId = req.cookies.sId;

    // If sId doesn't exists or no matched sId in sessions
    if (!sId || !sessions[sId]) {
        // Delete the session from the sessions object
        delete sessions[sId];

        // Clear the session id cookie
        res.clearCookie('sId');

        return res.redirect('/');
    }

    const username = sessions[sId];
    const game = Games.getGame(username);
    game.startNewGame();

    return res.redirect('/');
};
