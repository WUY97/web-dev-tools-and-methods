import React from 'react';
import compare from '../utils/compare';

export default function GuessingGame({ handleLogout }) {
    const [currentGuess, setCurrentGuess] = React.useState('');
    const [guessMessage, setGuessMessage] = React.useState('');

    const secretWord = 'RECAT';
    const validGuess = /^[a-zA-Z]{6,}$/;

    const handleSubmit = (event) => {
        event.preventDefault();
        const word = event.target.word.value.toUpperCase();

        if (word === secretWord) {
            setGuessMessage('You guessed it!');
            setCurrentGuess(word);
        } else if (!validGuess.test(word)) {
            setGuessMessage(word + ' is not a valid guess');
        } else if (word.length <= 5) {
            setGuessMessage(word + ' is too short');
        } else {
            setGuessMessage(
                word + ' has ' + compare(secretWord, word) + ' correct letters'
            );
            setCurrentGuess(word);
        }
    };

    return (
        <>
            <button type='submit' id='logout-btn' onClick={handleLogout}>
                Logout
            </button>
            <h2 id='current-guess'>
                {currentGuess
                    ? 'Your current guess is ' + currentGuess.toUpperCase()
                    : 'No guess yet'}
            </h2>
            <form onSubmit={handleSubmit}>
                <label for='word'>Your guess</label>
                <input type='text' id='word' name='word' required />
                <button type='submit'>Try</button>
                {guessMessage ? <p id='guess-message'>{guessMessage}</p> : ''}
            </form>
        </>
    );
}
