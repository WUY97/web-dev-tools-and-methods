import { useState } from 'react';

import './App.css';

import Header from './pages/header/Header';
import Home from './pages/main/Home';
import MyPost from './pages/main/MyPost';
import CreatePost from './pages/main/CreatePost';
import Login from './pages/main/Login';

function App() {
    const [page, setPage] = useState('Home');
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className='app'>
            <Header
                setShowLogin={setShowLogin}
                setPage={setPage}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                username={username}
                setUsername={setUsername}
            />
            {page === 'Home' && <Home username={username} />}
            {page === 'MyPost' && <MyPost loggedIn={loggedIn} username={username} />}
            {page === 'CreatePost' && <CreatePost />}
            {!loggedIn && showLogin && (
                <Login
                    showLogin={showLogin}
                    setLoggedIn={setLoggedIn}
                    setUsername={setUsername}
                    setPage={setPage}
                    setShowLogin={setShowLogin}
                />
            )}
        </div>
    );
}

export default App;
