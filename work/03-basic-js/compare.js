"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {  // DO NOT MODIFY
    // Time Complexity: O(n), Space Complexity: O(1)

    // Compare regardless of upper/lowercase
    word = word.toLowerCase();
    guess = guess.toLowerCase();

    // User a array of length of 26 to store if 'a-z' exists in word & guess in ascii code order
    let wordCount = Array(26).fill(false), guessCount = Array(26).fill(false);

    // Assume the compare function will always be passed two words of the same length
    // Iterate through word and guess in the same loop to count if character 'a-z' exists
    for (let i = 0; i < word.length; i++) {
        wordCount[word.charCodeAt(i) - 'a'.charCodeAt(0)] ? '' : wordCount[word.charCodeAt(i) - 'a'.charCodeAt(0)] = true;
        guessCount[guess.charCodeAt(i) - 'a'.charCodeAt(0)] ? '' : guessCount[guess.charCodeAt(i) - 'a'.charCodeAt(0)] = true;
    }

    // Match++ if a character exists in both words
    let common = 0;
    for (let i = 0; i < 26; i++) {
        wordCount[i] && guessCount[i] ? common++ : '';
    }

    return common;
}
