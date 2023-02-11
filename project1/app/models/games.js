const words = require('../../words');
const helper = require('../helpers/game');
class Game {
    constructor(username) {
        this.username = username;
        this.currentGame = {};
        this.previousGames = [];
    }

    startNewGame() {
        const possible = [];
        for (let word of words) {
            possible.push(word.toUpperCase());
        }

        const wordLen = possible[0].length;
        const newGame = {
            secret: helper.getRandomWord(words).toUpperCase(),
            possible: possible,
            incorrect: [],
            attempt: 0,
            success: false,
            wordLen: wordLen,
        };

        if (Object.keys(this.currentGame).length !== 0) {
            this.previousGames.push(this.currentGame);
        }

        this.currentGame = newGame;
        return;
    }

    continueGame() {
        if (Object.keys(this.currentGame).length === 0) {
            this.startNewGame();
            return;
        }
        return;
    }

    guessWord(word) {
        word = word.toUpperCase();
        if (word === this.currentGame.secret) {
            this.currentGame.success = true;
            this.currentGame.attempt++;
            return;
        }

        let common = helper.compare(word, this.getSecret());
        this.currentGame.possible = this.currentGame.possible.filter(
            (val) => val !== word
        );
        this.currentGame.incorrect.push({ word: word, common: common });
        this.currentGame.attempt++;
        return;
    }

    getUsername() {
        return this.username;
    }

    getCurrentGame() {
        return this.currentGame;
    }

    getAttempt() {
        return this.currentGame.attempt;
    }

    getSuccess() {
        return this.currentGame.success;
    }

    getSecret() {
        return this.currentGame.secret;
    }

    getPossible() {
        return this.currentGame.possible;
    }

    getIncorrect() {
        return this.currentGame.incorrect;
    }

    getWordLen() {
        return this.currentGame.wordLen;
    }
}

const games = {};

module.exports = {
    getGame: (username) => {
        if (!games[username]) {
            games[username] = new Game(username);
        }

        games[username].continueGame();
        return games[username];
    },
};
