const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
    const sid = uuid();
    sessions[sid] = {
        username,
    };
    return sid;
}

function getSessionUser(sid) {
    // Conditional Chaining operator ?.
    // Use MDN to learn more
    return sessions[sid]?.username;
}

function deleteSession(sid) {
    delete sessions[sid];
}

function getOnlineUsers(username) {
    const onlineUsers = new Set();
    Object.values(sessions).forEach((session) => {
        if (session.username !== username) {
            onlineUsers.add(session.username);
        }
    });

    return Array.from(onlineUsers);
}

module.exports = {
    addSession,
    deleteSession,
    getSessionUser,
    getOnlineUsers,
};
