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
    disableSendButton,
    enableSendButton,
    renderNotification,
} = require('./components.js');

const { compareLists } = require('./helpers.js');

// Login and logout related elements
const username = document.querySelector('#username');
const loginContainer = document.querySelector('#login-container');
const logoutBtn = document.querySelector('#logout-btn');

// Chat related elements
const userList = document.querySelector('#user-list');
const toSend = document.querySelector('#to-send');
const outgoingMessage = document.querySelector('#outgoing-message');

const state = {
    currentUser: null,
    currentChat: null,
    onlineUsers: [],
    chatHistory: [],
};

// intervals
let onlineUserInterval;
let updateChatInterval;

function clearState() {
    state.currentUser = null;
    state.currentChat = null;
    state.onlineUsers = [];
    state.chatHistory = [];
}

// Handle the login form submit
function handleLoginContainerSubmit(event) {
    event.preventDefault();
    showLoadingIndicator();
    fetchLogin(username.value)
        .then((result) => {
            state.currentUser = result.username;
            renderLoginStatus();
            hideLoadingIndicator();
        })
        .catch((error) => {
            renderLoginError(error.error);
            clearState();
            clearInterval(updateChatInterval);
            clearInterval(onlineUserInterval);
            hideLoadingIndicator();
        });
}

// Handle the logout button click
function handleLogoutClick(event) {
    event.preventDefault();
    showLoadingIndicator();
    fetchLogout().then((result) => {
        clearState();
        clearInterval(updateChatInterval);
        clearInterval(onlineUserInterval);
        renderNotification('You have successfully logged out.', 5000, 'green');
        renderLoginContainer();
        hideChatContainer();
        hideLoadingIndicator();
    });
}

// Render the login status
function renderLoginStatus() {
    checkLoginStatus()
        .then((result) => {
            if (result.username !== state.currentUser) {
                clearState();
                state.currentUser = result.username;
            }
            hideLoginContainer(state.currentUser);
            renderChatContainer();
            renderOnlineUsers();
        })
        .catch((error) => {
            clearState();
            clearInterval(updateChatInterval);
            clearInterval(onlineUserInterval);
            renderLoginContainer();
            hideChatContainer();
        });
}

// Render the online users
function renderOnlineUsers() {
    showLoadingIndicator();
    getOnlineUsers()
        .then((result) => {
            if (!compareLists(result, state.onlineUsers)) {
                state.onlineUsers = result;
                displayUsers(state.onlineUsers);
            }
            hideLoadingIndicator();
        })
        .catch((error) => {
            if (error.error === 'network-error') {
                renderNotification(
                    'Network error: Please check your internet connection.',
                    10000,
                    'red'
                );
                return;
            }

            if (error.error === 'auth-missing') {
                clearState();
                renderNotification(
                    'Login Error: You are logged out due to authentication error.',
                    5000,
                    'red'
                );
                clearInterval(updateChatInterval);
                clearInterval(onlineUserInterval);
                renderLoginContainer();
                hideChatContainer();
                return;
            }
        });

    onlineUserInterval = setInterval(() => {
        getOnlineUsers()
            .then((result) => {
                if (!compareLists(result, state.onlineUsers)) {
                    renderNotification('Online users updated', 5000, 'green');
                    state.onlineUsers = result;
                    displayUsers(state.onlineUsers);
                }

                if (result.includes(state.currentChat)) {
                    enableSendButton();
                }
            })
            .catch((error) => {
                clearInterval(onlineUserInterval);
                if (error.error === 'network-error') {
                    renderNotification(
                        'Network error: Please check your internet connection.',
                        10000,
                        'red'
                    );
                    return;
                }

                if (error.error === 'auth-missing') {
                    clearState();
                    renderNotification(
                        'Login Error: You are logged out due to authentication error.',
                        5000,
                        'red'
                    );
                    clearInterval(updateChatInterval);
                    clearInterval(onlineUserInterval);
                    renderLoginContainer();
                    return;
                }
            });
    }, 5000);
}

// Handle the user click online user
function handleUserClick(event) {
    event.preventDefault();
    showLoadingIndicator();
    const div = event.target.closest('div');
    state.currentChat = div.getAttribute('data-username');

    if (!state.currentChat) {
        state.chatHistory = [];
        state.currentChat = null;
        hideConversation();
        hideLoadingIndicator();
        clearInterval(updateChatInterval);
        return;
    }

    renderChatHeader(state.currentChat);
    renderChatMessage(state.chatHistory);

    updateChat(state.currentChat)
        .then((result) => {
            if (!compareLists(result.messages, state.chatHistory)) {
                state.chatHistory = result.messages;
                renderChatMessage(state.chatHistory);
            }

            renderMessageInput();
            hideLoadingIndicator();
        })
        .catch((error) => {
            if (error.error === 'network-error') {
                renderNotification(
                    'Network error: Please check your internet connection.',
                    10000,
                    'red'
                );
                return;
            }

            if (error.error === 'auth-missing') {
                clearState();
                renderNotification(
                    'Login Error: You are logged out due to authentication error.',
                    5000,
                    'red'
                );
                clearInterval(updateChatInterval);
                clearInterval(onlineUserInterval);
                renderLoginContainer();
                hideChatContainer();
                hideLoadingIndicator();
                return;
            }

            if (error.error === 'user-not-found') {
                renderNotification(
                    'User ' + state.currentChat + ' is not online.',
                    5000,
                    'red'
                );
                hideConversation();
                state.currentChat = null;
                state.chatHistory = [];
                clearInterval(updateChatInterval);
                hideLoadingIndicator();
                return;
            }

            if (error.error === 'empty-username') {
                state.chatHistory = [];
                state.currentChat = null;
                clearInterval(updateChatInterval);
                hideConversation();
                hideLoadingIndicator();
                return;
            }
        });

    updateChatInterval = setInterval(() => {
        updateChat(state.currentChat)
            .then((result) => {
                if (!compareLists(result.messages, state.chatHistory)) {
                    state.chatHistory = result.messages;
                    renderChatMessage(state.chatHistory);
                }
            })
            .catch((error) => {
                clearInterval(updateChatInterval);
                if (error.error === 'network-error') {
                    renderNotification(
                        'Network error: Please check your internet connection.',
                        10000,
                        'red'
                    );
                    return;
                }

                if (error.error === 'auth-missing') {
                    clearState();
                    renderNotification(
                        'Login Error: You are logged out due to authentication error.',
                        5000,
                        'red'
                    );
                    clearInterval(updateChatInterval);
                    clearInterval(onlineUserInterval);
                    renderLoginContainer();
                    return;
                }

                if (error.error === 'user-not-found') {
                    renderNotification(
                        'User ' + state.currentChat + ' is not online.',
                        5000,
                        'red'
                    );
                    hideConversation();
                    state.currentChat = null;
                    state.chatHistory = [];
                    clearInterval(updateChatInterval);
                    return;
                }

                if (error.error === 'empty-username') {
                    state.chatHistory = [];
                    state.currentChat = null;
                    hideConversation();
                    clearInterval(updateChatInterval);
                    return;
                }
            });
    }, 5000);
}

// Handle the message submit
function handleMessageSubmit(event) {
    event.preventDefault();
    showLoadingIndicator();
    addMessage(toSend.value, state.currentUser)
        .then((result) => {
            state.chatHistory = result.messages;
            renderChatMessage(state.chatHistory);
            toSend.value = '';
            toSend.focus();
            hideLoadingIndicator();
        })
        .catch((error) => {
            if (error.error === 'network-error') {
                renderNotification(
                    'Network error: Please check your internet connection.',
                    10000,
                    'red'
                );
                return;
            }

            if (error.error === 'auth-missing') {
                clearState();
                renderNotification(
                    'Login Error: You are logged out due to authentication error.',
                    5000,
                    'red'
                );
                clearInterval(updateChatInterval);
                clearInterval(onlineUserInterval);
                renderLoginContainer();
                hideChatContainer();
                hideLoadingIndicator();
                return;
            }

            if (error.error === 'user-not-found') {
                renderNotification(
                    'User ' + state.currentChat + ' is not online.',
                    5000,
                    'red'
                );
                hideConversation();
                state.currentChat = null;
                state.chatHistory = [];
                hideLoadingIndicator();
                clearInterval(updateChatInterval);
                return;
            }

            if (error.error === 'required-text') {
                renderMessageError(error.error);
                hideLoadingIndicator();
                return;
            }
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
