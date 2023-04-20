import { useState, useEffect } from 'react';

import './App.css';

import Header from './pages/header/Header';
import Home from './pages/main/Home';
import MyPost from './pages/main/MyPost';
import CreatePost from './pages/main/CreatePost';
import Login from './pages/main/Login';

import LoadingIndicator from './shared/components/LoadingIndicator';
import Error from './shared/components/Error';

import { checkLoginStatus } from './shared/utils/services';

function App() {
    const [page, setPage] = useState('Home');
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
        <div className='app'>
            <Header
                setShowLogin={setShowLogin}
                setPage={setPage}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                username={username}
                setUsername={setUsername}
                setShowCreatePost={setShowCreatePost}
                setIsLoading={setIsLoading}
                setErrorMessage={setErrorMessage}
            />
            {page === 'Home' && (
                <Home
                    username={username}
                    setIsLoading={setIsLoading}
                    loggedIn={loggedIn}
                />
            )}
            {page === 'MyPost' && <MyPost username={username} />}
            {showCreatePost && (
                <CreatePost
                    setShowCreatePost={setShowCreatePost}
                    username={username}
                    setPage={setPage}
                    setErrorMessage={setErrorMessage}
                />
            )}
            {!loggedIn && showLogin && (
                <Login
                    showLogin={showLogin}
                    setLoggedIn={setLoggedIn}
                    setUsername={setUsername}
                    setPage={setPage}
                    setShowLogin={setShowLogin}
                    setIsLoading={setIsLoading}
                    setErrorMessage={setErrorMessage}
                />
            )}
            {isLoading && <LoadingIndicator />}
            {errorMessage && <Error errorMessage={errorMessage} />}
        </div>
    );
}

export default App;
