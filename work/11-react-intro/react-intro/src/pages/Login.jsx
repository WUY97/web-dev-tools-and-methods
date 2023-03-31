import React from 'react';

export default function Login({ handleLogin, errorMessage }) {
    return (
        <>
            <form onSubmit={handleLogin}>
                <label for='username'>
                    Username
                    <input
                        type='text'
                        id='username'
                        name='username'
                        placeholder='Enter your username'
                    />
                </label>
                <br />
                {errorMessage && <p>{errorMessage}</p>}
                <button type='submit'>Submit</button>
            </form>
        </>
    );
}
