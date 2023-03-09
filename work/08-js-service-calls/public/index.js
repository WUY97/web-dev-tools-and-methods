/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkGameStatus": () => (/* binding */ checkGameStatus),
/* harmony export */   "checkLoginStatus": () => (/* binding */ checkLoginStatus),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "updateWordGuess": () => (/* binding */ updateWordGuess)
/* harmony export */ });
// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  .catch(err => Promise.reject({
    error: 'network-error'
  })).then(response => {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(err => Promise.reject(err));
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

function checkLoginStatus() {
  return fetch('/api/session/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).catch(err => Promise.reject({
    error: 'network-error'
  })).then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch('/api/session/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).catch(err => Promise.reject({
    error: 'network-error'
  })).then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  });
}
function checkGameStatus() {
  return fetch('/api/word/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).catch(err => Promise.reject({
    error: 'network-error'
  })).then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  });
}
function updateWordGuess(word) {
  return fetch('/api/word/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      word
    })
  }).catch(err => Promise.reject({
    error: 'network-error'
  })).then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
'use-strict';

const {
  fetchLogin,
  checkLoginStatus,
  fetchLogout,
  checkGameStatus,
  updateWordGuess
} = __webpack_require__(/*! ./services.js */ "./src/services.js");
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
  }
}

// Handle the login form submit
function handleLoginFormSubmit(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  fetchLogin(username).then(result => {
    loginError.style.display = 'none';
    loginError.textContent = '';
    renderLoginStatus();
  }).catch(error => {
    loginError.style.display = 'block';
    loginError.textContent = 'Login error: ' + renderErrorMessage(error.error);
    renderLoginStatus();
  });
}

// Handle the logout button click
function handleLogoutClick(event) {
  event.preventDefault();
  fetchLogout().then(result => {
    renderLoginStatus();
  }).catch(error => {
    console.log(error);
  });
}

// Handle the guess form submit
function handleGuessFormSubmit(event) {
  event.preventDefault();
  const word = document.getElementById('word').value;
  updateWordGuess(word).then(result => {
    renderGameStatus();
    guessError.style.display = 'none';
    guessError.textContent = '';
  }).catch(error => {
    renderGameStatus();
    guessError.style.display = 'block';
    guessError.textContent = 'Guess error: ' + renderErrorMessage(error.error);
  });
}

// Render the login status
function renderLoginStatus() {
  checkLoginStatus().then(result => {
    hideLoginForm(result.username);
    renderGameContainer();
  }).catch(error => {
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
  checkGameStatus().then(result => {
    if (result.storedWord) {
      currentGuess.textContent = 'Your most recent guess is: ' + result.storedWord;
    } else {
      currentGuess.textContent = 'No guess yet';
    }
  }).catch(error => {
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
})();

/******/ })()
;
//# sourceMappingURL=index.js.map