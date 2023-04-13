const { userDB } = require('../database/db');
const { isValidUsername } = require('../helpers/utils');

exports.getUser = async (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? userDB.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
};

exports.createUser = async (req, res) => {
    const { username } = req.body;

    if (!isValidUsername(username)) {
        console.log(username);
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = userDB.addSession(username);

    res.cookie('sid', sid);
    res.status(201).json({ username });
};

exports.deleteUser = async (req, res) => {
    const { sid } = req.cookies;
    const username = userDB.getSessionUser(sid);

    if (sid) {
        res.clearCookie('sid');
    }

    if (username) {
        userDB.deleteSession(sid);
    }

    res.json({ wasLoggedIn: !!username });
};
