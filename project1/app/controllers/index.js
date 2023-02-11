const sessions = require('../models/sessions');
const Games = require('../models/games');

exports.get = (req, res) => {
    const sId = req.cookies.sId;
    return res.send(`
        <!doctype html>
        <html>
            <head>
            <title>Guess the Word</title>
            </head>
            <body>
                <main>
                    ${getTitle(sId)}
                    ${getLoginStatus(sId)}
                    ${getGames(sId)}
                    ${guessWordForm(sId)}
                    ${startNewGameForm(sId)}
                    ${getLoginForm(sId)}
                </main>
            </body>
        </html>
    `);
};

const getTitle = (sId) => {
    if (!sId || !sessions[sId]) {
        return `<h1>Enter your username to start:</h1>`;
    } else {
        return `<h1>Hi ${sessions[sId]},</h1>`;
    }
};

const getLoginForm = (sId) => {
    // Check if the session id exists in the sessions object
    if (!sId || !sessions[sId]) {
        // Render the login page
        return `
            <div id='login-form'>
                <form action="/login" method="post">
                    <input type="text" name="username" pattern="^(?!dog$)[a-zA-Z0-9]+" placeholder="Username" title="Username can only contain letters and numbers and can not be dog" required>
                    <button type="submit">Login</button>
                </form>
            </div>
        `;
    } else {
        // Render the logout button
        return `
            <div id='logout'>
                <form action="/logout" method="post">
                    <button type="submit">Logout</button>
                </form>
            </div>
        `;
    }
};

const getLoginStatus = (sId) => {
    // Check if the session id exists in the sessions object
    if (!sId || !sessions[sId]) {
        // Render the login page
        return `
        <div id='stored-word'>
            <p>Please log in.</p>
        </div>
        `;
    } else {
        const username = sessions[sId];
        // Render the login status
        return `
            <div id='stored-word'>
                <p>You are logging in as: ${username}.</p>
                <p>Request had cookie 'sId' : ${sId}.</p>
            </div>
        `;
    }
};

const getGames = (sId) => {
    // Check if the session id exists in the sessions object
    if (!sId || !sessions[sId]) {
        return ``;
    } else {
        const username = sessions[sId];
        const game = Games.getGame(username);
        console.log({ username: game.getUsername(), secret: game.getSecret() });
        const possible = game.getPossible();
        const incorrect = game.getIncorrect();
        const attempt = game.getAttempt();
        return (
            `<p>Possible words: ` +
            possible.map((word) => `<span>${word}, </span>`).join('') +
            `</p>` +
            `<p>Incorrect words: ` +
            Object.values(incorrect)
                .map((word) => `<span>${word.word}: ${word.common}, </span>`)
                .join('') +
            `</p>` +
            `<p>Attempts: ${attempt}</p>`
        );
    }
};

const guessWordForm = (sId, wordError) => {
    if (!sId || !sessions[sId]) {
        return ``;
    } else {
        const username = sessions[sId];
        const game = Games.getGame(username);
        const length = game.getWordLen();
        const attempt = game.getAttempt();
        if (game.getSuccess()) {
            return `<p>Congrats!</p><p>You won in ${attempt} attempts.</p>`;
        }

        return `
            <div class='word-form'>
                <form action="/guess" method="post">
                    <input type="text" name="guess" minlength='${length}' maxlength='${length}' pattern="[a-zA-Z]+" placeholder="Your guess" title='Your guess can only includes letters and be size of ${length}.'>
                    <button type="submit">Submit</button>
                </form>
                ${wordError ? `<p class='error'>${guessError}</p>` : ''}
            </div>
        `;
    }
};

const startNewGameForm = (sId) => {
    if (!sId || !sessions[sId]) {
        return ``;
    } else {
        return `
            <div class='word-form'>
                <form action="/new-game" method="post">
                    <button type="submit">Start New Game</button>
                </form>
            </div>
        `;
    }
};
