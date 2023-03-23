const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
const alphaRegex = /^[a-zA-Z]+$/;
const validUsernameRegex = /^(?!dog$)[a-zA-Z0-9]+/;

module.exports = {
    isAlphaNumeric: (str) => {
        return alphaNumericRegex.test(str);
    },

    isValidUsername: (str) => {
        return validUsernameRegex.test(str);
    },

    isOneWord: (str) => {
        return str.split(' ').length === 1 && alphaRegex.test(str);
    },

    isAlpha: (str) => {
        return alphaRegex.test(str);
    },
};
