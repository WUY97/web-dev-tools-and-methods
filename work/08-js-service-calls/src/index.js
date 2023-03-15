'use-strict';

const {
    fetchLogin,
    checkLoginStatus,
    fetchLogout,
    checkGameStatus,
    updateWordGuess,
} = require('./services.js');

const loginForm = document.querySelector('#login-form');
const loginError = document.querySelector('#login-error');
const loginStatus = document.querySelector('#login-status');
const logoutBtn = document.querySelector('#logout-btn');
const gameContainer = document.querySelector('#game-container');
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
    } else if (error === 'network-error') {
        return 'Network error. Please check your connection and try again.';
    }
}

// Handle the login form submit
function handleLoginFormSubmit(event) {
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

// Handle the guess form submit
function handleGuessFormSubmit(event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    updateWordGuess(word)
        .then((result) => {
            renderGameStatus();
            guessError.style.display = 'none';
            guessError.textContent = '';
        })
        .catch((error) => {
            renderGameStatus();
            guessError.style.display = 'block';
            guessError.textContent =
                'Guess error: ' + renderErrorMessage(error.error);
        });
}

// Render the login status
function renderLoginStatus() {
    checkLoginStatus()
        .then((result) => {
            hideLoginForm(result.username);
            renderGameContainer();
        })
        .catch((error) => {
            renderLoginForm();
            hideGameContainer();
        });
}

// Render the login form
function renderLoginForm() {
    loginForm.style.display = 'flex';
    logoutBtn.style.display = 'none';
    loginStatus.innerHTML = 'Enter username to start:';
}

// Hide the login form
function hideLoginForm(username) {
    loginForm.style.display = 'none';
    logoutBtn.style.display = 'flex';
    loginStatus.innerHTML = 'Logged in as: ' + username;
}

// Render the game container
function renderGameContainer() {
    gameContainer.style.display = 'flex';
    renderGameStatus();
}

// Hide the game container
function hideGameContainer() {
    gameContainer.style.display = 'none';
}

// Render the game status
function renderGameStatus() {
    checkGameStatus()
        .then((result) => {
            if (result.storedWord) {
                currentGuess.textContent =
                    'Your most recent guess is: ' + result.storedWord;
            } else {
                currentGuess.textContent = 'No guess yet';
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

// Initialize the page
function init() {
    renderLoginStatus();
    loginForm.addEventListener('submit', handleLoginFormSubmit);
    logoutBtn.addEventListener('click', handleLogoutClick);
    guessForm.addEventListener('submit', handleGuessFormSubmit);
}

// Call the init function when the DOM is ready
document.addEventListener('DOMContentLoaded', init);
