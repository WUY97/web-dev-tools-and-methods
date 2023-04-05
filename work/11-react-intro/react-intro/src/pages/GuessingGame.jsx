import React from 'react';
import compare from '../utils/compare';
import '../App.css';

export default function GuessingGame({ handleLogout, username }) {
    const [currentGuess, setCurrentGuess] = React.useState('');
    const [guessMessage, setGuessMessage] = React.useState('');

    const secretWord = 'RECAT';
    const validGuess = /^[a-zA-Z]{5}$/;

    const handleSubmit = (event) => {
        event.preventDefault();
        const word = event.target.word.value.toUpperCase();

        // If the input did contain a 5 character word, and it was identical (regardless of case) to the secret word, the page will say "XXX is the secret word!"
        if (word === secretWord) {
            setGuessMessage(word + ' is the secret word!');
            setCurrentGuess(word);
        } else if (word.length === 0) {
            setGuessMessage('Please enter a five-letter word.');
        } else if (word.length !== 5 || !validGuess.test(word)) {
            // If the input did not contain a 5 character word, the page will add the message "XXX was not a valid word", where XXX is what was in the input field
            setGuessMessage(word + ' was not a valid word.');
        } else {
            // If the input did contain a 5 character word, but it was not the secret word, the page will say "XXX had N letters in common", where XXX is what was in the input field, and N is the number of letters in common with the secret word, using the same concepts from the compare code from section 1
            setGuessMessage(
                word +
                    ' had ' +
                    compare(secretWord, word) +
                    ' letters in common.'
            );
            setCurrentGuess(word);
        }
    };

    return (
        <div className='game-container'>
            <h2>
                Hi {username},
                {currentGuess
                    ? ' your most recent guess is ' +
                      currentGuess.toUpperCase() +
                      '.'
                    : " let's guess a five-letter word!"}
            </h2>
            <form onSubmit={handleSubmit}>
                <label for='word'>Your new guess:</label>
                <input
                    type='text'
                    name='word'
                    placeholder='A five-letter word'
                />
                {guessMessage ? <p className='message'>{guessMessage}</p> : ''}
                <button type='submit'>Try</button>
            </form>
            <button type='submit' onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
