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
const newNotification = document.querySelector('#new-notification');

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
export function renderLoginError(error) {
    loginError.style.display = 'block';
    loginError.textContent = 'Login error: ' + renderErrorMessage(error);
    setTimeout(() => {
        loginError.style.display = 'none';
        loginError.textContent = '';
    }, 10000);
}

// Render the message error message
export function renderMessageError(error) {
    messageError.style.display = 'block';
    messageError.textContent = 'Message error: ' + renderErrorMessage(error);
    setTimeout(() => {
        messageError.style.display = 'none';
        messageError.textContent = '';
    }, 5000);
}

// Render the login form
export function renderLoginContainer() {
    loginContainer.style.display = 'flex';
    loginStatus.style.display = 'none';
    loggedUser.textContent = '';
}

// Hide the login form
export function hideLoginContainer(username) {
    loginContainer.style.display = 'none';
    loginStatus.style.display = 'flex';
    loggedUser.textContent = username;
}

// Render the chat container
export function renderChatContainer() {
    chatContainer.style.display = 'grid';
    messageList.innerHTML = `<p id='start-message'>To start chatting - choose a conversation</p>`;
}

// Hide the chat container
export function hideChatContainer() {
    chatContainer.style.display = 'none';
}

// Render the online users
export function displayUsers(users) {
    if (users.length > 0) {
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
    } else {
        userList.innerHTML = `<p id='empty-online-list'>No user online 🙉</p>`;
    }
}

export function renderChatHeader(username2) {
    chatHeader.innerHTML = '';
    chatHeader.textContent = username2;
}

export function renderMessageInput() {
    messageInput.style.display = 'block';
}

export function hideConversation() {
    // Clear the chat header
    chatHeader.innerHTML = '';

    // Clear message list and set default message
    messageList.innerHTML = `<p id='start-message'>To start chatting - choose a conversation 😎</p>`;

    // Hide message input
    messageInput.style.display = 'none';

    // Clear form value
    toSend.value = '';
}

export function disableSendButton() {
    sendBtn.disabled = true;
}

export function enableSendButton() {
    sendBtn.disabled = false;
}

export function renderChatMessage(messages) {
    messageList.innerHTML = '';
    messages.forEach((message) => {
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

export function showLoadingIndicator() {
    loader.style.display = 'inline-block';
}

export function hideLoadingIndicator() {
    loader.style.display = 'none';
}

export function renderNotification(message, duration) {
    newNotification.style.display = 'block';
    newNotification.textContent = message;

    setTimeout(() => {
        newNotification.style.display = 'none';
        newNotification.textContent = '';
    }, duration);
}
