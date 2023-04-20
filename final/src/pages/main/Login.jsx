import { fetchLogin } from '../../api';
import renderErrorMessage from '../../shared/utils/renderErrorMessage';
import { useStore } from '../../store/Store';

function Login() {
    const { state, dispatch } = useStore();
    const { showLogin } = state;
    const handleLogin = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;

        dispatch({
            type: 'call_api',
        });
        fetchLogin(username)
            .then((result) => {
                dispatch({
                    type: 'login_success',
                    data: result.username,
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'login_fail',
                    data: 'Login error: ' + renderErrorMessage(error.error),
                });
            });
    };

    const handleClose = () => {
        dispatch({
            type: 'set_show_login',
            data: false,
        })
    };

    return (
        <>
            {showLogin && (
                <div className='modal'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h1>Enter username to log in.</h1>
                            <button
                                className='modal-close-button'
                                onClick={handleClose}
                            >
                                <i className='gg-close'></i>
                            </button>
                        </div>
                        <form className='login-form' onSubmit={handleLogin}>
                            <label htmlFor='username'>
                                <h3>Username</h3>
                            </label>
                            <input
                                type='text'
                                name='username'
                                placeholder='Enter your username'
                            />
                            <button type='submit' className='filled-button'>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
