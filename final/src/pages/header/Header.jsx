import Menu from './Menu';

import logo from '../../assets/logo.png';

import { useStore } from '../../store/Store';

function Header() {
    const { state, dispatch } = useStore();
    const { userDetails } = state;

    return (
        <header className='nav-bar'>
            <div className='nav-left'>
                <div className='header'>
                    <button
                        onClick={() =>
                            dispatch({
                                type: 'set_page',
                                data: 'Home',
                            })
                        }
                    >
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
                {userDetails && <div className='username'>{userDetails}</div>}
                <Menu />
            </nav>
        </header>
    );
}

export default Header;
