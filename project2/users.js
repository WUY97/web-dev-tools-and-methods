
function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[a-zA-Z0-9]{2,20}$/);
    return isValid;
}

module.exports = {
    isValidUsername,
};