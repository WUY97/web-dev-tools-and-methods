const { userDB } = require('../database/db');

module.exports = (req, res, next) => {
    const sid = req.cookies.sid;
    const username = sid ? userDB.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    next();
}