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

    res.json({ wasLoggedIn: !!username });
});

app.get('/api/chat', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { username2 } = req.query;
    
    if (!username2 || username2 === '' ) {
        res.status(400).json({ error: 'empty-username' });
        return;
    }

    if (!sessions.getOnlineUsers().includes(username2)) {
        res.status(400).json({ error: 'user-not-found' });
        return;
    }

    const conversation = chats.getConversation(username, username2);

    res.json(conversation);
});

app.post('/api/chat', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { text, receiver } = req.body;

    if (!sessions.getOnlineUsers().includes(receiver)) {
        res.status(400).json({ error: 'user-not-found' });
        return;
    }

    if (!text && text === '') {
        res.status(400).json({ error: 'required-text' });
        return;
    }

    chats.addMessage(username, receiver, text);

    const conversation = chats.getConversation(username, receiver);

    res.json(conversation);
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
