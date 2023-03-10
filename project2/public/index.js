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
/* harmony export */   "addMessage": () => (/* binding */ addMessage),
/* harmony export */   "checkLoginStatus": () => (/* binding */ checkLoginStatus),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "getOnlineUsers": () => (/* binding */ getOnlineUsers),
/* harmony export */   "updateChat": () => (/* binding */ updateChat)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },

    body: JSON.stringify({
      username
    })
  }).catch(err => Promise.reject({
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
function updateChat() {
  return fetch('/api/chat/', {
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
function addMessage(word) {
  return fetch('/api/word/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      word,
      receiver
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
function getOnlineUsers() {
  return fetch('/api/user/', {
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
  updateChat,
  addMessage,
  getOnlineUsers
} = __webpack_require__(/*! ./services.js */ "./src/services.js");
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

// Render the login status
function renderLoginStatus() {
  checkLoginStatus().then(result => {
    hideLoginContainer(result.username);
    renderChatContainer();
  }).catch(error => {
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
})();

/******/ })()
;
//# sourceMappingURL=index.js.map