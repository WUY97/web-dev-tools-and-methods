'use-strict';

const {
    fetchLogin,
    checkLoginStatus,
    fetchLogout,
    updateChat,
    addMessage,
    getOnlineUsers,
} = require('./services.js');

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
    enableSendButton,
} = require('./components.js');

// Login and logout related elements
const username = document.querySelector('#username');
const loginContainer = document.querySelector('#login-container');
const logoutBtn = document.querySelector('#logout-btn');

// Chat related elements
const userList = document.querySelector('#user-list');
const toSend = document.querySelector('#to-send');
const outgoingMessage = document.querySelector('#outgoing-message');

// Logged in user's name & chat partner's name
let username1, username2;

// TODO: replace username identifier with a session identifier

// Handle the login form submit
function handleLoginContainerSubmit(event) {
    event.preventDefault();
    username1 = username.value;
    showLoadingIndicator();
    fetchLogin(username1)
        .then((result) => {
            hideLoginError();
            renderLoginStatus();
            hideLoadingIndicator();
        })
        .catch((error) => {
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
    fetchLogout().then((result) => {
        renderLoginStatus();
        hideLoadingIndicator();
    });
}

// Render the login status
function renderLoginStatus() {
    checkLoginStatus()
        .then((result) => {
            hideLoginContainer(result.username);
            renderChatContainer();
            renderOnlineUsers();
        })
        .catch((error) => {
            renderLoginContainer();
            hideChatContainer();
        });
}

// Render the online users
function renderOnlineUsers() {
    showLoadingIndicator();
    getOnlineUsers().then((result) => {
        displayUsers(result);
        hideLoadingIndicator();
    });

    setInterval(() => {
        getOnlineUsers().then((result) => {
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
    // TODO: Change the way of getting username2
    username2 = null;
    const div = event.target.closest('div');
    username2 = div.getAttribute('data-username');
    if (!username2) {
        hideConversation();
        hideLoadingIndicator();
        return;
    }

    updateChat(username2).then((result) => {
        renderChatHeader(username2);
        renderChatMessage(result.messages);
        renderMessageInput();
        hideLoadingIndicator();
    });

    // TODO: Add notification for new messages when user is not focused on the window
    setInterval(() => {
        updateChat(username2).then((result) => {
            renderChatMessage(result.messages);
        });
    }, 5000);
}

// Handle the message submit
function handleMessageSubmit(event) {
    event.preventDefault();
    showLoadingIndicator();
    const text = toSend.value;

    addMessage(text, username2)
        .then((result) => {
            renderChatMessage(result.messages);
            hideMessageError();
            toSend.value = '';
            toSend.focus();
            hideLoadingIndicator();
        })
        .catch((error) => {
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
