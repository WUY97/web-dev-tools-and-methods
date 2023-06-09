const { v4: uuidv4 } = require('uuid');

const sessions = require('../models/sessions');
const helpers = require('../helpers/helpers');
const Games = require('../models/games');

// Login endpoint
exports.post = (req, res) => {
    const { username } = req.body;

    if (!username || !helpers.isValidUsername(username)) {
        return res.redirect(
            '/?loginError=' +
                'Invalid username. Username should not be "dog" and should be made up of letters or numbers only.'
        );
    }

    // Generate a new session id
    const sId = uuidv4();

    // Store the session id and user id in the sessions object
    sessions[sId] = username;

    // Send the session id as a cookie to the client
    res.cookie('sId', sId, { httpOnly: true });

    const game = Games.getGame(username);
    if (game.getSuccess()) {
        game.startNewGame();
    }

    return res.redirect('/');
};
