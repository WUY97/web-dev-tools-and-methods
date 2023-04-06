import { useState } from 'react';

function Login({ setLoggedIn, setUsername, setPage }) {
    const [errorMessage, setErrorMessage] = useState('');
    
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
            setPage('Home');
        }
    };

    return (
        <main>
            <h1>Enter username to log in.</h1>
            <form onSubmit={handleLogin}>
                <label for='username'>Username:</label>
                <input
                    type='text'
                    name='username'
                    placeholder='Enter your username'
                />
                {errorMessage && <p className='message'>{errorMessage}</p>}
                <button type='submit'>Login</button>
            </form>
        </main>
    );
}

export default Login;
