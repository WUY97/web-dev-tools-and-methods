const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');
const chats = require('./chats');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json()); // Parses requests with json content bodies

// Sessions
// Check for existing session (used on page load)
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

// Create a new session (login)
app.post('/api/session', (req, res) => {
    const { username } = req.body;

    if (!users.isValidUsername(username)) {
        console.log(username);
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);

    res.cookie('sid', sid);
    res.json({ username });
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (sid) {
        res.clearCookie('sid');
    }

    if (username) {
        // Delete the session, but not the user data
        sessions.deleteSession(sid);
    }

    // We don't report any error if sid or session didn't exist
    // Because that means we already have what we want
    res.json({ wasLoggedIn: !!username }); // Provides some extra info that can be safely ignored
});

app.get('/api/chat', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const chatList = chats.getChats(username);

    res.json(chatList);
});

app.post('/api/chat', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { text, receiver } = req.body;

    if (!text && text === '') {
        res.status(400).json({ error: 'required-word' });
        return;
    }

    chats.addMessage(username, receiver, text);

    const chatList = chats.getChats(username);

    res.json(chatList);
});

app.get('/api/user', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const userList = sessions.getOnlineUsers(username);

    res.json(userList);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
