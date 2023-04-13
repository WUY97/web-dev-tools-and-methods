exports.isValidUsername = (username) => {
    return typeof username === 'string' && username.match(/^[A-Za-z0-9_]+$/);
}