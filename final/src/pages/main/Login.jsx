import { useState } from 'react';

import Error from '../../shared/components/Error';

import { fetchLogin } from '../../shared/utils/services';
import renderErrorMessage from '../../shared/utils/renderErrorMessage';

function Login({
    setLoggedIn,
    setUsername,
    showLogin,
    setShowLogin,
    setIsLoading,
}) {
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
                setShowLogin(false);
            })
            .catch((error) => {
                setUsername('');
                setLoggedIn(false);
                setShowLogin(true);
                setErrorMessage(
                    'Login error: ' + renderErrorMessage(error.error)
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
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
                                <i className='gg-close'></i>
                            </button>
                        </div>
                        <form className='login-form' onSubmit={handleLogin}>
                            <label htmlFor='username'>
                                <h3>Username</h3>
                            </label>
                            <input
                                type='text'
                                name='username'
                                placeholder='Enter your username'
                            />
                            {errorMessage && (
                                <Error errorMessage={errorMessage} />
                            )}
                            <button type='submit' className='filled-button'>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
