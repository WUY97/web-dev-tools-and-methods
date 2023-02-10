const sessions = require('../models/sessions');
const game = require('../helpers/game');

exports.get = (req, res) => {
    const sId = req.cookies.sId;
    const loginError = req.query.loginError;
    const guessError = req.query.guessError;
    return res.send(`
        <!doctype html>
        <html>
            <head>
            <title>Guess the Word</title>
            </head>
            <body>
                <main>
                    ${getTitle(sId)}
                    ${getGames(sId)}
                    ${guessWordForm(sId, guessError)}
                    ${startNewGameForm(sId)}
                    ${getLoginForm(sId, loginError)}
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

// const getLoginStatus = (sId) => {
//     // Check if the session id exists in the sessions object
//     if (!sId || !sessions[sId]) {
//         // Render the login page
//         return `
//         <div id='stored-word'>
//             <p>Please log in.</p>
//         </div>
//         `;
//     } else {
//         const username = sessions[sId];
//         // Render the login status
//         return `
//             <div id='stored-word'>
//                 <p>You are logging in as: ${username}.</p>
//                 <p>Request had cookie 'sId' : ${sId}.</p>
//             </div>
//         `;
//     }
// };

const getGames = (sId) => {
    // Check if the session id exists in the sessions object
    if (!sId || !sessions[sId]) {
        return ``;
    } else {
        const username = sessions[sId];
        console.log({ username: username, secret: game.getSecret(username) });
        const possible = game.getPossible(username);
        const incorrect = game.getIncorrect(username);
        const attempt = game.getAttempt(username);
        return (
            `<p>Possible words: ` +
            possible.map((word) => `<span>${word}, </span>`).join('') +
            `</p>`
            +
            `<p>Incorrect words: ` +
            Object.values(incorrect).map((word) => `<span>${word.word}: ${word.common}, </span>`).join('') +
            `</p>`
            +
            `<p>Attempts: ${attempt}</p>`
        );
    }
};

const guessWordForm = (sId, wordError) => {
    if (!sId || !sessions[sId]) {
        return ``;
    } else {
        const username = sessions[sId];
        if (game.ifSuccess(username)) {
            return `<p>Congrats!</p>`;
        }

        return `
            <div class='word-form'>
                <form action="/guess" method="post">
                    <input type="text" name="guess" placeholder="Guess a word here">
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
