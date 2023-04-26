import { useState } from 'react';

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

import { useStore } from '../../store/Store';

function Menu() {
    const { state, dispatch } = useStore();
    const { userDetails } = state;

    const [open, setOpen] = useState(false);

    return (
        <div className='dropdown'>
            <button
                id='dropbtn'
                className='text-button menu-button'
                onClick={(e) => setOpen(!open)}
                aria-label='Open Menu'
            >
                <i className='gg-menu'></i>
            </button>
            <div className={`dropdown-content ${open ? 'show' : ''}`}>
                <button
                    className='text-button'
                    onClick={(e) =>
                        dispatch({
                            type: 'set_page',
                            data: 'Home',
                        })
                    }
                    aria-label='Go Home'
                >
                    <div>
                        <i className='gg-home'></i>
                    </div>{' '}
                    Home
                </button>
                {userDetails ? (
                    <>
                        <button
                            className='text-button'
                            onClick={(e) =>
                                dispatch({
                                    type: 'set_page',
                                    data: 'MyPost',
                                })
                            }
                            aria-label='Go to my post page'
                        >
                            <div>
                                <i className='gg-notes'></i>
                            </div>{' '}
                            My Posts
                        </button>
                        <button
                            className='text-button'
                            onClick={() =>
                                dispatch({
                                    type: 'set_show_create_post',
                                    data: true,
                                })
                            }
                            aria-label='Go to create new post page'
                        >
                            <div>
                                <i className='gg-add-r'></i>
                            </div>{' '}
                            Create Post
                        </button>
                    </>
                ) : (
                    ''
                )}
                {userDetails ? <LogoutButton /> : <LoginButton />}
            </div>
        </div>
    );
}

export default Menu;
