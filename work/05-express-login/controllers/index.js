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
            <title>Guess the Word</title>
            <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <main>
                    ${getTitle(sId)}
                    ${getStoredWord(sId)}
                    ${updateWordForm(sId, wordError)}
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
        return `<h1>Hi ${sessions[sId]},</h1>`
    }
}

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

const getStoredWord = (sId) => {
    // Check if the session id exists in the sessions object
    if (!sId || !sessions[sId]) {
        return ``;
    } else {
        const username = sessions[sId];
        const word = words[username];
        // Render the logout button
        return `
                <h2 class="store-word">${
                    !word
                        ? "Let's guess a word!"
                        : 'Your last attempt was: ' + word.toUpperCase() + '.'
                }</h2>
            `;
    }
};

const updateWordForm = (sId, wordError) => {
    if (!sId || !sessions[sId]) {
        return ``;
    } else {
        return `
            <div class='word-form'>
                <form action="/store" method="post">
                    <input type="text" name="word" placeholder="Guess a word here">
                    <button type="submit">Submit</button>
                </form>
                ${wordError ? `<p class='error'>${wordError}</p>` : ''}
            </div>
        `;
    }
};
