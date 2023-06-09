import React, { useState } from 'react';

import GuessingGame from './pages/GuessingGame';
import Login from './pages/Login';

import './App.css';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');

    const validUsername = /^[a-zA-Z0-9]{5,20}$/;

    const handleLogin = (event) => {
        event.preventDefault();
        const username = event.target.username.value;

        if (username === 'dog') {
            setErrorMessage('Invalid username.');
        } else if (username === '') {
            setErrorMessage('Please enter a username.');
        } else if (!validUsername.test(username)) {
            setErrorMessage(
                'Username must be 5-20 characters long and contain only letters and numbers.'
            );
        } else {
            setErrorMessage('');
            setLoggedIn(true);
            setUsername(username);
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        setLoggedIn(false);
    };

    return (
        <main>
            {loggedIn ? (
                <GuessingGame handleLogout={handleLogout} username={username} />
            ) : (
                <Login handleLogin={handleLogin} errorMessage={errorMessage} />
            )}
        </main>
    );
}

export default App;
