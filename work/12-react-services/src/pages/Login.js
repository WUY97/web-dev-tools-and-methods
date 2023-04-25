import { useState } from 'react';
import '../App.css';

import renderErrorMessage from '../utils/renderErrorMessage';
import { fetchLogin } from '../utils/services';

export default function Login({ setLoggedIn, setUsername, setIsLoading }) {
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const username = event.target.username.value;

        fetchLogin(username)
            .then((result) => {
                setUsername(result.username);
                setLoggedIn(true);
                setErrorMessage('');
            })
            .catch((error) => {
                setUsername('');
                setLoggedIn(false);
                setErrorMessage(
                    'Login error: ' + renderErrorMessage(error.error)
                );
            }).finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className='login-container'>
            <h1>Enter username to log in.</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor='username'>Username:</label>
                <input
                    type='text'
                    name='username'
                    placeholder='Enter your username'
                />
                {errorMessage && <p className='message'>{errorMessage}</p>}
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}
