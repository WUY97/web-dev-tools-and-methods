const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
const alphaRegex = /^[a-zA-Z]+$/;

module.exports = {
    isAlphaNumeric: (str) => {
        return alphaNumericRegex.test(str);
    },

    isOneWord: (str) => {
        return (str.split(" ").length === 1 && alphaRegex.test(str));
    }
};