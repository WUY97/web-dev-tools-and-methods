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
    fetchLogin(username1)
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
        users.forEach((user) => {
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

    updateChat(username2).then((result) => {
        renderChatHeader(result.participants);
        renderChatMessage(result.messages);
        messageInput.style.display = 'block';
    });

    setInterval(() => {
        updateChat(username2).then((result) => {
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
    messages.forEach((message) => {
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

    addMessage(text, username2).then((result) => {
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
