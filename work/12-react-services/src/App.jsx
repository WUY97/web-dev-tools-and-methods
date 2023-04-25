import { useState, useEffect } from 'react';

import GuessingGame from './pages/GuessingGame';
import Login from './pages/Login';
import LoadingIndicator from './components/LoadingIndicator';

import { checkLoginStatus } from './utils/services';

import './App.css';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkLoginStatus()
            .then((result) => {
                setUsername(result.username);
                setLoggedIn(true);
            })
            .catch((error) => {
                setUsername('');
                setLoggedIn(false);
            });
    }, []);

    return (
        <main>
            {loggedIn ? (
                <GuessingGame
                    setLoggedIn={setLoggedIn}
                    username={username}
                    setUsername={setUsername}
                    setIsLoading={setIsLoading}
                />
            ) : (
                <Login
                    setLoggedIn={setLoggedIn}
                    setUsername={setUsername}
                    setIsLoading={setIsLoading}
                />
            )}
            {isLoading && <LoadingIndicator />}
        </main>
    );
}

export default App;
