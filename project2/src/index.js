'use-strict';

const {
    fetchLogin,
    checkLoginStatus,
    fetchLogout,
    updateChat,
    addMessage,
    getOnlineUsers,
} = require('./services.js');

const loginContainer = document.querySelector('#login-container');
const loginError = document.querySelector('#login-error');
const loginStatus = document.querySelector('#login-status');
const logoutBtn = document.querySelector('#logout-btn');
const loggedUser = document.querySelector('#logged-user');
const chatContainer = document.querySelector('#chat-container');
const guessForm = document.querySelector('#guess-form');
const currentGuess = document.querySelector('#current-guess');
const guessError = document.querySelector('#guess-error');

// Render error messages based on server response
function renderErrorMessage(error) {
    if (error === 'auth-missing') {
        return 'Missing credentials. You must be logged in to play the game.';
    } else if (error === 'auth-insufficient') {
        return 'Forbidden username. You cannot play the game as "dog".';
    } else if (error === 'required-username') {
        return 'Invalid username. Username can only contain letters and numbers.';
    } else if (error === 'required-word') {
        return 'Word missing. You must provide a word.';
    } else if (error === 'invalid-word') {
        return 'Invalid word. Word can only contain letters.';
    }
}

// Handle the login form submit
function handleLoginContainerSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    fetchLogin(username)
        .then((result) => {
            loginError.style.display = 'none';
            loginError.textContent = '';
            renderLoginStatus();
        })
        .catch((error) => {
            loginError.style.display = 'block';
            loginError.textContent =
                'Login error: ' + renderErrorMessage(error.error);
            renderLoginStatus();
        });
}

// Handle the logout button click
function handleLogoutClick(event) {
    event.preventDefault();
    fetchLogout()
        .then((result) => {
            renderLoginStatus();
        })
        .catch((error) => {
            console.log(error);
        });
}

// Render the login status
function renderLoginStatus() {
    checkLoginStatus()
        .then((result) => {
            hideLoginContainer(result.username);
            renderChatContainer();
        })
        .catch((error) => {
            renderLoginContainer();
            hideChatContainer();
        });
}

// Render the login form
function renderLoginContainer() {
    loginContainer.style.display = 'flex';
    loginStatus.style.display = 'none';
    loggedUser.innerHTML = '';
}

// Hide the login form
function hideLoginContainer(username) {
    loginContainer.style.display = 'none';
    loginStatus.style.display = 'flex';
    loggedUser.innerHTML = username;
}

// Render the game container
function renderChatContainer() {
    chatContainer.style.display = 'grid';
}

// Hide the game container
function hideChatContainer() {
    chatContainer.style.display = 'none';
}

// // Handle the guess form submit
// function handleGuessFormSubmit(event) {
//     event.preventDefault();
//     const word = document.getElementById('word').value;
//     updateWordGuess(word)
//         .then((result) => {
//             renderGameStatus();
//             guessError.style.display = 'none';
//             guessError.textContent = '';
//         })
//         .catch((error) => {
//             renderGameStatus();
//             guessError.style.display = 'block';
//             guessError.textContent =
//                 'Guess error: ' + renderErrorMessage(error.error);
//         });
// }

// // Render the game status
// function renderGameStatus() {
//     checkGameStatus()
//         .then((result) => {
//             if (result.storedWord) {
//                 currentGuess.textContent =
//                     'Your most recent guess is: ' + result.storedWord;
//             } else {
//                 currentGuess.textContent = 'No guess yet';
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }

// Initialize the page
function init() {
    renderLoginStatus();
    loginContainer.addEventListener('submit', handleLoginContainerSubmit);
    logoutBtn.addEventListener('click', handleLogoutClick);
    // guessForm.addEventListener('submit', handleGuessFormSubmit);
}

// Call the init function when the DOM is ready
document.addEventListener('DOMContentLoaded', init);
