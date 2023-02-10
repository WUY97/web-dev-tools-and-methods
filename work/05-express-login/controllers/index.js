const sessions = require('../models/sessions');
const words = require('../models/words');

exports.get = (req, res) => {
    const sId = req.cookies.sId;
    const loginError = req.query.loginError;
    const wordError = req.query.wordError;
    return res.send(`
        <!doctype html>
        <html>
            <head>
            <title>Chat</title>
            </head>
            <body>
                <main>
                    <div id='login-form'>${getLoginForm(sId, loginError)}</div>
                    <div id='login-status'>${getLoginStatus(sId)}</div>
                    <div id='stored-word'>${getStoredWord(sId)}</div>
                    <div id='word-form'>${updateWordForm(sId, wordError)}</div>
                </main>
            </body>
        </html>
    `);
};

const getLoginForm = (sId, loginError) => {
    // Check if the session id exists in the sessions object
    if (!sId || !sessions[sId]) {
        // Render the login page
        return `
            <form action="/login" method="post">
                <input type="text" name="username" placeholder="Username">
                <button type="submit">Login</button>
            </form>
            ${loginError ? `<p style="color:red">${loginError}</p>` : ""}
        `;
    } else {
        // Render the logout button
        return `
            <form action="/logout" method="post">
                <button type="submit">Logout</button>
            </form>
        `;
    }
};

const getLoginStatus = (sId) => {
    // Check if the session id exists in the sessions object
    if (!sId || !sessions[sId]) {
        // Render the login page
        return `
            <p>Please log in.</p>
        `;
    } else {
        const username = sessions[sId];
        // Render the login status
        return `
            <p>You are logging in as: ${username}.</p>
            <p>Request had cookie 'sId' : ${sId}.</p>
        `;
    }
};

const getStoredWord = (sId) => {
    // Check if the session id exists in the sessions object
    if (!sId || !sessions[sId]) {
        return ``;
    } else {
        const username = sessions[sId];
        const word = words[username];
        // Render the logout button
        return `
                <p>${
                    !word
                        ? "Let's guess a word!"
                        : 'Your current stored word is: ' + word + '.'
                }</p>
            `;
    }
};

const updateWordForm = (sId, wordError) => {
    if (!sId || !sessions[sId]) {
        return ``;
    } else {
        return `
        <form action="/store" method="post">
            <input type="text" name="word" placeholder="Guess a word here">
            <button type="submit">Submit</button>
        </form>
        ${wordError ? `<p style="color:red">${wordError}</p>` : ""}
    `;
    }
};
