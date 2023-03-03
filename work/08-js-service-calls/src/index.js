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

// Handle the login form submit
function handleLoginFormSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    fetchLogin(username)
        .then((result) => {
            renderLoginStatus();
        })
        .catch((error) => {
            loginError.innerHTML =
                '<p>Login error: ' +
                error.error +
                '. Please try again later.</p>';
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
            guessError.innerHTML ='';
        })
        .catch((error) => {
            renderGameStatus();
            guessError.innerHTML =
                '<p>Guess error: ' +
                error.error +
                '. Please try again later.</p>';
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
    loginForm.style.display = 'block';
    logoutBtn.style.display = 'none';
    loginStatus.innerHTML = 'Not logged in';
}

// Hide the login form
function hideLoginForm(username) {
    loginForm.style.display = 'none';
    logoutBtn.style.display = 'block';
    loginStatus.innerHTML = 'Logged in as: ' + username;
}

// Render the game container
function renderGameContainer() {
    gameContainer.style.display = 'block';
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
