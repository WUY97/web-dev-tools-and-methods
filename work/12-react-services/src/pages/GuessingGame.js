import { useState, useEffect } from 'react';

import renderErrorMessage from '../utils/renderErrorMessage';
import {
    fetchLogout,
    checkGameStatus,
    updateWordGuess,
} from '../utils/services';

import '../App.css';

export default function GuessingGame({
    setLoggedIn,
    username,
    setUsername,
    setIsLoading,
}) {
    const [currentGuess, setCurrentGuess] = useState('');
    const [guessMessage, setGuessMessage] = useState('');

    useEffect(() => {
        checkGameStatus()
            .then((result) => {
                if (result.storedWord) {
                    setCurrentGuess(result.storedWord);
                } else {
                    setCurrentGuess('');
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.error === 'auth-missing') {
                    setLoggedIn(false);
                    setUsername('');
                    return;
                }
            });
    }, [setLoggedIn, setUsername]);

    const handleLogout = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        fetchLogout()
            .then((result) => {
                setLoggedIn(false);
                setUsername('');
            })
            .catch((error) => {
                console.log(renderErrorMessage(error.error));
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const word = event.target.word.value.toUpperCase();

        updateWordGuess(word)
            .then((result) => {
                setGuessMessage('');
                setCurrentGuess(result.storedWord);
            })
            .catch((error) => {
                if (error.error === 'auth-missing') {
                    setLoggedIn(false);
                    setUsername('');
                    return;
                }

                setGuessMessage(
                    'Guess error: ' + renderErrorMessage(error.error)
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
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
                <label htmlFor='word'>Your new guess:</label>
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
