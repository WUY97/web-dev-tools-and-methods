const uuid = require('uuid').v4;

class User {
    constructor(username) {
        this.username = username;
    }
}

class UserDB {
    constructor() {
        this.users = {};
        this.sessions = {};
    }

    getUserByUsername(username) {
        return this.users[username];
    }

    createUser(username) {
        if (!User.isValidUsername(username)) {
            return null;
        }

        if (this.users[username]) {
            return null;
        }

        const newUser = new User(username);
        this.users[username] = newUser;

        return newUser;
    }

    deleteUser(username) {
        const user = this.getUserByUsername(username);
        if (!user) {
            return false;
        }

        delete this.users[username];

        return true;
    }

    getAllUsers() {
        return Object.values(this.users);
    }

    addSession(username) {
        const sid = uuid();
        this.sessions[sid] = {
            username,
        };
        return sid;
    }

    getSessionUser(sid) {
        return this.sessions[sid]?.username;
    }

    deleteSession(sid) {
        delete this.sessions[sid];
    }
}

module.exports = UserDB;
