import { useState } from 'react';

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

function Menu({
    setPage,
    loggedIn,
    setLoggedIn,
    username,
    setUsername,
    setShowLogin,
    setShowCreatePost,
    setIsLoading,
}) {
    function go(event, page) {
        event.preventDefault();
        setPage(page);
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleCreatePost = () => {
        setShowCreatePost(true);
    };

    return (
        <div className='dropdown'>
            <button
                id='dropbtn'
                className='text-button menu-button'
                onClick={handleOpen}
                aria-label='Open Menu'
            >
                <i className='gg-menu'></i>
            </button>
            <div className={`dropdown-content ${open ? 'show' : ''}`}>
                <button
                    className='text-button'
                    onClick={(e) => go(e, 'Home')}
                    aria-label='Go Home'
                >
                    <div>
                        <i className='gg-home'></i>
                    </div>{' '}
                    Home
                </button>

                <button
                    className='text-button'
                    onClick={(e) => go(e, 'MyPost')}
                    aria-label='Go to my post page'
                >
                    <div>
                        <i className='gg-notes'></i>
                    </div>{' '}
                    My Posts
                </button>

                <button
                    className='text-button'
                    onClick={handleCreatePost}
                    aria-label='Go to create new post page'
                >
                    <div>
                        <i className='gg-add-r'></i>
                    </div>{' '}
                    Create Post
                </button>
                {loggedIn ? (
                    <LogoutButton
                        setUsername={setUsername}
                        setLoggedIn={setLoggedIn}
                        setIsLoading={setIsLoading}
                    />
                ) : (
                    <LoginButton setShowLogin={setShowLogin} />
                )}
            </div>
        </div>
    );
}

export default Menu;
