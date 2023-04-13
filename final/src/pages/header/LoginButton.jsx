import React from 'react';

function LoginButton({ setShowLogin }) {
    const handleLogin = () => {
        setShowLogin(true);
    };

    return (
        <button
            className='text-button'
            onClick={handleLogin}
            aria-label='Go to login page'
        >
            <div>
                <i className='gg-log-in'></i>
            </div>{' '}
            Login
        </button>
    );
}

export default LoginButton;
