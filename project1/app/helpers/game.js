const words = require('../../words');
const games = require('../models/games');

const game = {
    startNewGame: (username) => {
        const possible = [];
        for (let word of words) {
            possible.push(word.toUpperCase());
        }

        let newGame = {
            secret: game.getRandomWord().toUpperCase(),
            possible: possible,
            incorrect: [],
            attempt: 0,
            success: false,
        };

        if (!games[username]) {
            games[username] = {};
            games[username].currentGame = newGame;
            games[username].previousGames = [];
            return games[username].currentGame;
        }

        const currentGame = games[username].currentGame;
        games[username].previousGames.push(currentGame);
        games[username].currentGame = newGame;

        return games[username].currentGame;
    },

    continueGame: (username) => {
        if (!games[username] || !games[username].currentGame || game.ifSuccess(username)) {
            return game.startNewGame(username);
        }

        return games[username].currentGame;
    },

    getCurrentGame: (username) => {
        return games[username].currentGame;
    },

    getPreviousGame: (username) => {
        return games[username].previousGames;
    },

    getRandomWord: () => {
        const max = words.length;
        if (max === 0) {
            return;
        }

        return words[Math.floor(Math.random() * max)];
    },

    getPossible: (username) => {
        return games[username].currentGame.possible;
    },

    getIncorrect: (username) => {
        return games[username].currentGame.incorrect;
    },

    getSecret: (username) => {
        return games[username].currentGame.secret;
    },

    getAttempt: (username) => {
        return games[username].currentGame.attempt;
    },

    ifSuccess: (username) => {
        return games[username].currentGame.success;
    },

    guessWord: (username, word) => {
        word = word.toUpperCase();
        // check if match secret
        if (word === games[username].currentGame.secret) {
            games[username].currentGame.success = true;
            games[username].currentGame.attempt++;
            return;
        }

        // check if is valid
        if (!games[username].currentGame.possible.includes(word)) {
            return;
        }

        const common = game.compare(word, games[username].currentGame.secret);
        games[username].currentGame.possible = games[
            username
        ].currentGame.possible.filter((val) => val !== word);
        games[username].currentGame.incorrect.push({
            word: word,
            common: common,
        });
        games[username].currentGame.attempt++;

        return;
    },

    isValid: (guess, possible) => {
        guess = guess.toUpperCase();
        return;
    },

    compare: (guess, secret) => {
        // Time Complexity: O(n), Space Complexity: O(1)

        // Compare regardless of upper/lowercase
        guess = guess.toUpperCase();
        secret = secret.toUpperCase();

        // User a array of length of 26 to store if 'a-z' exists in word & guess in ascii code order
        let guessCount = Array(26).fill(false),
            secretCount = Array(26).fill(false);

        // Assume the compare function will always be passed two words of the same length
        // Iterate through word and guess in the same loop to count if character 'a-z' exists
        for (let i = 0; i < secret.length; i++) {
            guessCount[guess.charCodeAt(i) - 'a'.charCodeAt(0)]
                ? ''
                : (guessCount[guess.charCodeAt(i) - 'a'.charCodeAt(0)] = true);
            secretCount[secret.charCodeAt(i) - 'a'.charCodeAt(0)]
                ? ''
                : (secretCount[
                      secret.charCodeAt(i) - 'a'.charCodeAt(0)
                  ] = true);
        }

        // common++ if a character exists in both words
        let common = 0;
        for (let i = 0; i < 26; i++) {
            guessCount[i] && secretCount[i] ? common++ : '';
        }

        return common;
    },
};

module.exports = game;
