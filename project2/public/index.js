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
function updateChat(username2) {
  return fetch(`/api/chat?username2=${username2}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).catch(err => Promise.reject({
    error: err
  })).then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  });
}
function addMessage(text, receiver) {
  return fetch('/api/chat/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      text,
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
const userList = document.querySelector('#user-list');
const messageList = document.querySelector('#message-list');
const outgoingMessage = document.querySelector('#outgoing-message');
const messageInput = document.querySelector('#message-input');
const toSend = document.querySelector('#to-send');
const chatHeader = document.querySelector('#chat-header');
let username1, username2;

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
  username1 = document.getElementById('username').value;
  fetchLogin(username1).then(result => {
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
  renderOnlineUsers();
}

// Hide the game container
function hideChatContainer() {
  chatContainer.style.display = 'none';
}

// TODO: show new messages in real time
// TODO: show new users in real time
function renderOnlineUsers() {
  function displayUsers(users) {
    userList.innerHTML = '';
    users.forEach(user => {
      const userElement = document.createElement('div');
      userElement.classList.add('user');
      userElement.setAttribute('data-username', user);
      const userAvatar = document.createElement('div');
      userAvatar.classList.add('avatar');
      userAvatar.textContent = user[0] + user[1];
      userAvatar.setAttribute('data-username', user);
      const username = document.createElement('div');
      username.classList.add('username');
      username.textContent = user;
      username.setAttribute('data-username', user);
      const hr = document.createElement('hr');
      userElement.appendChild(userAvatar);
      userElement.appendChild(username);
      userList.appendChild(userElement);
      userList.appendChild(hr);
    });
  }
  getOnlineUsers().then(displayUsers);
  setInterval(() => {
    getOnlineUsers().then(displayUsers);
  }, 5000);
}
function handleUserClick(event) {
  event.preventDefault();
  username2 = null;
  const div = event.target.closest('div');
  username2 = div.getAttribute('data-username');
  if (!username2) {
    return;
  }
  updateChat(username2).then(result => {
    renderChatHeader(result.participants);
    renderChatMessage(result.messages);
    messageInput.style.display = 'block';
  });
  setInterval(() => {
    updateChat(username2).then(result => {
      renderChatMessage(result.messages);
    });
  }, 5000);
}
function renderChatHeader(participants) {
  chatHeader.innerHTML = '';
  chatHeader.textContent = username2;
}

// TODO: stably render me / other user messages; Currently the messages are rendered in the wrong order
function renderChatMessage(messages) {
  messageList.innerHTML = '';
  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    const messageAvatar = document.createElement('div');
    messageAvatar.classList.add('message-avatar');
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message.text;
    if (message.sender === username1) {
      messageElement.classList.add('message-sent');
      messageAvatar.textContent = 'ME';
      messageElement.appendChild(messageContent);
      messageElement.appendChild(messageAvatar);
    } else {
      messageElement.classList.add('message-received');
      messageAvatar.textContent = message.sender[0] + message.sender[1];
      messageElement.appendChild(messageAvatar);
      messageElement.appendChild(messageContent);
    }
    messageList.appendChild(messageElement);
  });
}
function handleMessageSubmit(event) {
  event.preventDefault();
  const text = toSend.value;
  addMessage(text, username2).then(result => {
    renderChatMessage(result.messages);
  });
  clearInput();
}
function clearInput() {
  toSend.value = '';
  toSend.focus();
}

// Initialize the page
function init() {
  renderLoginStatus();
  loginContainer.addEventListener('submit', handleLoginContainerSubmit);
  logoutBtn.addEventListener('click', handleLogoutClick);
  userList.addEventListener('click', handleUserClick);
  outgoingMessage.addEventListener('submit', handleMessageSubmit);
}

// Call the init function when the DOM is ready
document.addEventListener('DOMContentLoaded', init);
})();

/******/ })()
;
//# sourceMappingURL=index.js.map