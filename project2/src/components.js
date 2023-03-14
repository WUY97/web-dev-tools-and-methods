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

export function renderLoginError(error) {
    loginError.style.display = 'block';
    loginError.textContent = 'Login error: ' + renderErrorMessage(error);
}

export function hideLoginError() {
    loginError.style.display = 'none';
    loginError.textContent = '';
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

// Render the game container
export function renderChatContainer() {
    chatContainer.style.display = 'grid';
    messageList.innerHTML = `<p id='start-message'>To start chatting - choose a conversation</p>`;
}

// Hide the game container
export function hideChatContainer() {
    chatContainer.style.display = 'none';
}

export function displayUsers(users) {
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

export function renderChatHeader(username2) {
    chatHeader.innerHTML = '';
    chatHeader.textContent = username2;
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
            messageAvatar.textContent = message.sender[0] + message.sender[1];
            messageElement.appendChild(messageAvatar);
            messageElement.appendChild(messageContent);
        }
        messageList.appendChild(messageElement);
    });
}
