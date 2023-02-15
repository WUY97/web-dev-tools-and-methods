const sessions = require('../models/sessions');
const Games = require('../models/games');

exports.get = (req, res) => {
    const sId = req.cookies.sId;
    const loginError = req.query.loginError;
    const guessError = req.query.guessError;
    return res.send(`
        <!doctype html>
        <html>
            <head>
                <title>Guess My Word</title>
                <link rel="stylesheet" href="/styles.css">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
            </head>
            <body>
                <header>
                    ${getTitle(sId)}
                    ${getLoginForm(sId, loginError)}
                    ${startNewGameButton(sId)}
                    ${getLogoutButton(sId)}
                </header>
                <main>
                    ${guessWordForm(sId, guessError)}
                    ${getGames(sId)}
                    ${getResultForm(sId)}
                </main>
            </body>
        </html>
    `);
};

// Header
const getTitle = (sId) => {
    if (!sId || !sessions[sId]) {
        return `<h1>Enter your username to start:</h1>`;
    } else {
        return `<h1>Hi ${sessions[sId]}, </h1>`;
    }
};

const getLoginForm = (sId, loginError) => {
    // Check if the session id exists in the sessions object
    if (!sId || !sessions[sId]) {
        // Render the login page
        return `
            <div id='login-form'>
                <form action="/login" method="post">
                    <input type="text" name="username" placeholder="Username">
                    <button type="submit">Login</button>
                </form>
                ${loginError ? `<p class='error'>${loginError}</p>` : ''}
            </div>
        `;
    } else {
        return ``;
    }
};

const startNewGameButton = (sId) => {
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

const getLogoutButton = (sId) => {
    // Check if the session id exists in the sessions object
    if (!sId || !sessions[sId]) {
        return ``;
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

// main
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
        const success = game.getSuccess();
        const bestScore = game.getBestScore();
        if (success) {
            return ``;
        }
        return (bestScore
            ? `<h2>Personal Best: ${bestScore}</h2>`
            : ``) +
            `
            <h2>Current Attempts: ${attempt}</h2>
            <div class="words-panel">
            <h2>Possible words</h2>
            <div class="possible-words"> ` +
                possible
                    .map((word) => `<div class="word">${word}</div>`)
                    .join('') +
                `</div>
            </div>
        <div class="words-panel">` +
            (Object.keys(incorrect).length !== 0
                ? `<h2>Incorrect words (: in common)</h2>`
                : ``) +
            `<div class="incorrect-words"> ` +
            Object.values(incorrect)
                .map(
                    (word) =>
                        `<div class="word">${word.word}: ${word.common}</div>`
                )
                .join('') +
            `</div>
        </div>`;
    }
};

const guessWordForm = (sId, guessError) => {
    if (!sId || !sessions[sId]) {
        return ``;
    } else {
        const username = sessions[sId];
        const game = Games.getGame(username);
        if (game.getSuccess()) {
            return ``;
        }
        return `
            <div class='word-form'>
                <form action="/guess" method="post">
                    <input type="text" name="guess" placeholder="Your guess">
                    <button type="submit">Submit</button>
                </form>
                ${guessError ? `<p class='error'>${guessError}</p>` : ''}
            </div>
        `;
    }
};

const getResultForm = (sId) => {
    if (!sId || !sessions[sId]) {
        return ``;
    } else {
        const username = sessions[sId];
        const game = Games.getGame(username);
        const attempt = game.getAttempt();
        const secret = game.getSecret();
        if (game.getSuccess()) {
            return `
                <div class="congrats-message">
                    <h1>🎊 Congrats! 🎊</h1>
                    <h2>You won in <b>${attempt}</b> attempts.</h2>
                    <h2>My word is <b>${secret}</b>.</h2>
                </div>`;
        }
        return ``;
    }
};
