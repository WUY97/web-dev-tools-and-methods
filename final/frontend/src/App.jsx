import { useState } from 'react';

import './App.css';

import Header from './pages/header/Header';
import Home from './pages/main/Home';
import MyPost from './pages/main/MyPost';
// import Questions from './pages/main/Questions';
import Login from './pages/main/Login';

function App() {
    const [page, setPage] = useState('Home');
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    return (
        <div className='app'>
            <Header
                setPage={setPage}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                username={username}
                setUsername={setUsername}
            />
            {page === 'Home' && <Home username={username} />}
            {page === 'MyPost' && <MyPost loggedIn={loggedIn} username={username} />}
            {/* {page === 'Questions' && <Questions />} */}
            {page === 'Login' && !loggedIn && (
                <Login
                    setLoggedIn={setLoggedIn}
                    setUsername={setUsername}
                    setPage={setPage}
                />
            )}
        </div>
    );
}

export default App;
