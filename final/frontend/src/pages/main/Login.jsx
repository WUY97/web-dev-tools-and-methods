import { useState } from 'react';

function Login({ setLoggedIn, setUsername, setPage, showLogin, setShowLogin }) {
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
            setShowLogin(false);
        }
    };

    const handleClose = () => {
        setShowLogin(false);
    };

    return (
        <>
            {showLogin && (
                <div className='modal'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1>Enter username to log in.</h1>
                            <button
                                className='modal-close-button'
                                onClick={handleClose}
                            >
                                <i class='gg-close'></i>
                            </button>
                        </div>
                        <form className='login-form' onSubmit={handleLogin}>
                            <label for='username'><h3>Username</h3></label>
                            <input
                                type='text'
                                name='username'
                                placeholder='Enter your username'
                            />
                            {errorMessage && (
                                <p className='error-message'>{errorMessage}</p>
                            )}
                            <button type='submit' className='filled-button'>Login</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
