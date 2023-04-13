import Menu from './Menu';

import logo from '../../assets/logo.png';

function Header({
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

    return (
        <header className='nav-bar'>
            <div className='nav-left'>
                <div className='header'>
                    <button onClick={(e) => go(e, 'Home')}>
                        <img
                            className='header-logo'
                            src={logo}
                            alt='app-logo'
                        />
                    </button>
                    <h1 className='header-text'>Lime8</h1>
                </div>
            </div>
            <nav className='nav-right'>
                {loggedIn && username && <div className='username'>{username}</div>}
                <Menu
                    setPage={setPage}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    setUsername={setUsername}
                    setShowLogin={setShowLogin}
                    setShowCreatePost={setShowCreatePost}
                    setIsLoading={setIsLoading}
                />
            </nav>
        </header>
    );
}

export default Header;
