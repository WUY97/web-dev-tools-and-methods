const sessions = require('../models/sessions');
const Games = require('../models/games');

exports.get = (req, res) => {
    const sId = req.cookies.sId;
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

                        ${getLoginForm(sId)}
                        ${startNewGameButton(sId)}
                        ${getLogoutButton(sId)}

                </header>
                <main>
                    ${guessWordForm(sId)}
                    ${getGames(sId)}
                    ${getResultForm(sId)}
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
        if (success) {
            return ``;
        }
        return (
            `
            <h2>Attempts: ${attempt}</h2>
            <div class="words-panel">
                <h2>Possible words</h2>
                <div class="words"> ` +
            possible.map((word) => `<div class="word">${word}</div>`).join('') +
            `</div>
            </div>
            <div class="words-panel">` +
            (Object.keys(incorrect).length !== 0
                ? `<h2>Incorrect words (: in common)</h2>`
                : ``) +
            `<div class="words"> ` +
            Object.values(incorrect)
                .map(
                    (word) =>
                        `<div class="word">${word.word}: ${word.common}</div>`
                )
                .join('') +
            `</div>
            </div>`
        );
    }
};

const guessWordForm = (sId) => {
    if (!sId || !sessions[sId]) {
        return ``;
    } else {
        const username = sessions[sId];
        const game = Games.getGame(username);
        const length = game.getWordLen();
        if (game.getSuccess()) {
            return ``;
        }

        return `
            <div class='word-form'>
                <form action="/guess" method="post">
                    <input type="text" name="guess" minlength='${length}' maxlength='${length}' pattern="[a-zA-Z]+" placeholder="Your guess" title='Your guess can only includes letters and be size of ${length}.'>
                    <button type="submit">Submit</button>
                </form>
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


