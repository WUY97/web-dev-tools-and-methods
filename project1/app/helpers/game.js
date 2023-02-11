const game = {
    getRandomWord: (words) => {
        const max = words.length;
        if (max === 0) {
            return;
        }

        return words[Math.floor(Math.random() * max)];
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
            guessCount[guess.charCodeAt(i) - 'A'.charCodeAt(0)]
                ? ''
                : (guessCount[guess.charCodeAt(i) - 'A'.charCodeAt(0)] = true);
            secretCount[secret.charCodeAt(i) - 'A'.charCodeAt(0)]
                ? ''
                : (secretCount[
                        secret.charCodeAt(i) - 'A'.charCodeAt(0)
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
