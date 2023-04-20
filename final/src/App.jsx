import { useEffect } from 'react';

import './styles/App.css';

import Header from './pages/header/Header';
import Home from './pages/main/Home';
import MyPost from './pages/main/MyPost';
import CreatePost from './pages/main/CreatePost';
import Login from './pages/main/Login';

import LoadingIndicator from './shared/components/LoadingIndicator';
import Error from './shared/components/Error';

import { checkLoginStatus } from './api';
import { useStore } from './store/Store';

function App() {
    const { state, dispatch } = useStore();
    const { userDetails, loading, error, page, showLogin, showCreatePost } =
        state;

    useEffect(() => {
        checkLoginStatus()
            .then((result) => {
                dispatch({
                    type: 'get_user_success',
                    data: result.username,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dispatch]);

    return (
        <div className='app'>
            <Header />
            {page === 'Home' && <Home />}
            {page === 'MyPost' && <MyPost />}
            {showCreatePost && <CreatePost />}
            {(!userDetails && showLogin) && <Login />}
            {loading && <LoadingIndicator />}
            {error && <Error errorMessage={error} />}
        </div>
    );
}

export default App;
