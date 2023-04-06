import { useState } from 'react';

function Menu({ setPage, loggedIn, setLoggedIn, username, setUsername }) {
    function go(event, page) {
        event.preventDefault();
        setPage(page);
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        setLoggedIn(false);
        setUsername('');
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
                    <div><i class='gg-home'></i></div> Home
                </button>

                <button
                    className='text-button'
                    onClick={(e) => go(e, 'MyPost')}
                    aria-label='Go to my post page'
                >
                    <div><i class='gg-notes'></i></div> My Posts
                </button>

                <button
                    className='text-button'
                    onClick={(e) => go(e, 'CreatePost')}
                    aria-label='Go to create new post page'
                >
                    <div><i class='gg-add-r'></i></div> Create Post
                </button>
                {loggedIn ? (
                    <>
                        <button
                            className='text-button'
                            onClick={handleLogout}
                            aria-label='Logout'
                        >
                            <div><i class='gg-log-out'></i></div> Logout
                        </button>
                    </>
                ) : (
                    <button
                        className='text-button'
                        onClick={(e) => go(e, 'Login')}
                        aria-label='Go to login page'
                    >
                        <div><i class='gg-log-in'></i></div> Login
                    </button>
                )}
            </div>
        </div>
    );
}

export default Menu;
