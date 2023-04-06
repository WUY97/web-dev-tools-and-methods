import Menu from '../../shared/components/Menu';

import logo from '../../assets/logo.svg';

function Header({ setPage, loggedIn, setLoggedIn, username, setUsername }) {
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
                {username && <div className='username'>{username}</div>}
                <Menu
                    setPage={setPage}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    setUsername={setUsername}
                />
            </nav>
        </header>
    );
}

export default Header;
