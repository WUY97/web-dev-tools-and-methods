import React from 'react';
import compare from '../utils/compare';
import '../App.css';

export default function GuessingGame({ handleLogout, username }) {
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
        } else if (word.length === 0) {
            setGuessMessage('Please enter a guess.');
        }else if (word.length < 5) {
            setGuessMessage(word + ' is too short');
        } else if (!validGuess.test(word)) {
            setGuessMessage(word + ' is not a valid guess.');
        } else {
            setGuessMessage(
                word + ' has ' + compare(secretWord, word) + ' correct letters.'
            );
            setCurrentGuess(word);
        }
    };

    return (
        <div className='game-container'>
            <h2>
                Hi {username},
                {currentGuess
                    ? ' your most recent guess is ' + currentGuess.toUpperCase()
                    : ' start guessing!'}
            </h2>
            <form onSubmit={handleSubmit}>
                <label for='word'>Your new guess:</label>
                <input type='text' name='word' placeholder='Your guess here' />
                {guessMessage ? <p className='message'>{guessMessage}</p> : ''}
                <button type='submit'>Try</button>
            </form>
            <button type='submit' onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
