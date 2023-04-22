import React from 'react';
import '../App.css';

export default function Login({ handleLogin, errorMessage }) {
    return (
        <div className='login-container'>
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
        </div>
    );
}
