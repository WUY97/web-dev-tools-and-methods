/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components.js":
/*!***************************!*\
  !*** ./src/components.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "disableSendButton": () => (/* binding */ disableSendButton),
/* harmony export */   "displayUsers": () => (/* binding */ displayUsers),
/* harmony export */   "enableSendButton": () => (/* binding */ enableSendButton),
/* harmony export */   "hideChatContainer": () => (/* binding */ hideChatContainer),
/* harmony export */   "hideConversation": () => (/* binding */ hideConversation),
/* harmony export */   "hideLoadingIndicator": () => (/* binding */ hideLoadingIndicator),
/* harmony export */   "hideLoginContainer": () => (/* binding */ hideLoginContainer),
/* harmony export */   "hideLoginError": () => (/* binding */ hideLoginError),
/* harmony export */   "hideMessageError": () => (/* binding */ hideMessageError),
/* harmony export */   "renderChatContainer": () => (/* binding */ renderChatContainer),
/* harmony export */   "renderChatHeader": () => (/* binding */ renderChatHeader),
/* harmony export */   "renderChatMessage": () => (/* binding */ renderChatMessage),
/* harmony export */   "renderLoginContainer": () => (/* binding */ renderLoginContainer),
/* harmony export */   "renderLoginError": () => (/* binding */ renderLoginError),
/* harmony export */   "renderMessageError": () => (/* binding */ renderMessageError),
/* harmony export */   "renderMessageInput": () => (/* binding */ renderMessageInput),
/* harmony export */   "showLoadingIndicator": () => (/* binding */ showLoadingIndicator)
/* harmony export */ });
// Login and logout related elements
const loginError = document.querySelector('#login-error');
const loginContainer = document.querySelector('#login-container');
const loginStatus = document.querySelector('#login-status');
const loggedUser = document.querySelector('#logged-user');

// Chat related elements
const chatContainer = document.querySelector('#chat-container');
const userList = document.querySelector('#user-list');
const messageList = document.querySelector('#message-list');
const chatHeader = document.querySelector('#chat-header');
const messageInput = document.querySelector('#message-input');
const toSend = document.querySelector('#to-send');
const messageError = document.querySelector('#message-error');
const sendBtn = document.querySelector('#send-btn');
const loader = document.querySelector('#loader');

// Render error messages based on server response
function renderErrorMessage(error) {
  if (error === 'auth-missing') {
    return 'Missing credentials. You must be logged in to play the game.';
  } else if (error === 'empty-username') {
    return 'Invalid username. Username cannot be empty.';
  } else if (error === 'auth-insufficient') {
    return 'Forbidden username. You cannot play the game as "dog".';
  } else if (error === 'required-username') {
    return 'Invalid username. Username can only contain letters and numbers and should be within length from 2 to 20.';
  } else if (error === 'required-text') {
    return 'Message cannot be empty.';
  } else if (error === 'user-not-found') {
    return "The user you're sending message to does not exist or is offline.";
  } else if (error === 'network-error') {
    return 'Network error. Please check your internet connection.';
  }
}

// Render the login error message
function renderLoginError(error) {
  loginError.style.display = 'block';
  loginError.textContent = 'Login error: ' + renderErrorMessage(error);
  setTimeout(() => {
    hideLoginError();
  }, 10000);
}

// Hide the login error message
function hideLoginError() {
  loginError.style.display = 'none';
  loginError.textContent = '';
}

// Render the message error message
function renderMessageError(error) {
  messageError.style.display = 'block';
  messageError.textContent = 'Message error: ' + renderErrorMessage(error);
  setTimeout(() => {
    hideMessageError();
  }, 5000);
}

// Hide the message error message
function hideMessageError() {
  messageError.style.display = 'none';
  messageError.textContent = '';
}

// Render the login form
function renderLoginContainer() {
  loginContainer.style.display = 'flex';
  loginStatus.style.display = 'none';
  loggedUser.textContent = '';
}

// Hide the login form
function hideLoginContainer(username) {
  loginContainer.style.display = 'none';
  loginStatus.style.display = 'flex';
  loggedUser.textContent = username;
}

// Render the chat container
function renderChatContainer() {
  chatContainer.style.display = 'grid';
  messageList.innerHTML = `<p id='start-message'>To start chatting - choose a conversation</p>`;
}

// Hide the chat container
function hideChatContainer() {
  chatContainer.style.display = 'none';
}

// Render the online users
function displayUsers(users) {
  if (users.length > 0) {
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
  } else {
    userList.innerHTML = `<p id='empty-online-list'>No user online 🙉</p>`;
  }
}
function renderChatHeader(username2) {
  chatHeader.innerHTML = '';
  chatHeader.textContent = username2;
}
function renderMessageInput() {
  messageInput.style.display = 'block';
}
function hideConversation() {
  // Clear the chat header
  chatHeader.innerHTML = '';

  // Clear message list and set default message
  messageList.innerHTML = `<p id='start-message'>To start chatting - choose a conversation 😎</p>`;

  // Hide message input
  messageInput.style.display = 'none';

  // Clear form value
  toSend.value = '';
}
function disableSendButton() {
  sendBtn.disabled = true;
}
function enableSendButton() {
  sendBtn.disabled = false;
}
function renderChatMessage(messages) {
  messageList.innerHTML = '';
  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    const messageAvatar = document.createElement('div');
    messageAvatar.classList.add('message-avatar');
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    messageText.textContent = message.text;
    messageContent.appendChild(messageText);
    if (message.sender === loggedUser.textContent) {
      messageElement.classList.add('message-sent');
      messageAvatar.textContent = 'ME';
      messageElement.appendChild(messageContent);
      messageElement.appendChild(messageAvatar);
    } else {
      messageElement.classList.add('message-received');
      // Minimum length of username is 2
      messageAvatar.textContent = message.sender[0] + message.sender[1];
      messageElement.appendChild(messageAvatar);
      messageElement.appendChild(messageContent);
    }
    messageList.appendChild(messageElement);
  });
}
function showLoadingIndicator() {
  loader.style.display = 'inline-block';
}
function hideLoadingIndicator() {
  loader.style.display = 'none';
}

/***/ }),

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
  return fetch('/api/v1/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username
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
function checkLoginStatus() {
  return fetch('/api/v1/session/', {
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
  return fetch('/api/v1/session/', {
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
  return fetch(`/api/v1/chat?username2=${username2}`, {
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
  return fetch('/api/v1/chat/', {
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
  return fetch('/api/v1/user/', {
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
const {
  renderLoginError,
  hideLoginError,
  renderLoginContainer,
  hideLoginContainer,
  renderChatContainer,
  hideChatContainer,
  displayUsers,
  renderChatHeader,
  renderChatMessage,
  hideConversation,
  renderMessageInput,
  showLoadingIndicator,
  hideLoadingIndicator,
  renderMessageError,
  hideMessageError,
  disableSendButton,
  enableSendButton
} = __webpack_require__(/*! ./components.js */ "./src/components.js");

// Login and logout related elements
const username = document.querySelector('#username');
const loginContainer = document.querySelector('#login-container');
const logoutBtn = document.querySelector('#logout-btn');

// Chat related elements
const userList = document.querySelector('#user-list');
const toSend = document.querySelector('#to-send');
const outgoingMessage = document.querySelector('#outgoing-message');

// Chat partner's name
let username2;

// Handle the login form submit
function handleLoginContainerSubmit(event) {
  event.preventDefault();
  // username1 = username.value;
  showLoadingIndicator();
  fetchLogin(username.value).then(result => {
    hideLoginError();
    renderLoginStatus();
    hideLoadingIndicator();
  }).catch(error => {
    renderLoginError(error.error);
    renderLoginStatus();
    disableSendButton();
    hideLoadingIndicator();
  });
}

// Handle the logout button click
function handleLogoutClick(event) {
  event.preventDefault();
  showLoadingIndicator();
  fetchLogout().then(result => {
    renderLoginStatus();
    hideLoadingIndicator();
  });
}

// Render the login status
function renderLoginStatus() {
  checkLoginStatus().then(result => {
    hideLoginContainer(result.username);
    renderChatContainer();
    renderOnlineUsers();
  }).catch(error => {
    renderLoginContainer();
    hideChatContainer();
  });
}

// Render the online users
function renderOnlineUsers() {
  showLoadingIndicator();
  getOnlineUsers().then(result => {
    displayUsers(result);
    hideLoadingIndicator();
  });
  setInterval(() => {
    getOnlineUsers().then(result => {
      displayUsers(result);
      if (result.includes(username2)) {
        enableSendButton();
      }
    });
  }, 5000);
}

// Handle the user click online user
function handleUserClick(event) {
  event.preventDefault();
  showLoadingIndicator();
  username2 = null;
  const div = event.target.closest('div');
  username2 = div.getAttribute('data-username');
  if (!username2) {
    hideConversation();
    hideLoadingIndicator();
    return;
  }
  updateChat(username2).then(result => {
    renderChatHeader(username2);
    renderChatMessage(result.messages);
    renderMessageInput();
    hideLoadingIndicator();
  });
  setInterval(() => {
    updateChat(username2).then(result => {
      renderChatMessage(result.messages);
    });
  }, 5000);
}

// Handle the message submit
function handleMessageSubmit(event) {
  event.preventDefault();
  showLoadingIndicator();
  const text = toSend.value;
  addMessage(text, username2).then(result => {
    renderChatMessage(result.messages);
    hideMessageError();
    toSend.value = '';
    toSend.focus();
    hideLoadingIndicator();
  }).catch(error => {
    renderMessageError(error.error);
    if (error.error === 'user-not-found') {
      disableSendButton();
    }
    hideLoadingIndicator();
  });
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