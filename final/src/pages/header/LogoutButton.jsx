import { fetchLogout } from '../../api';
import renderErrorMessage from '../../shared/utils/renderErrorMessage';
import { useStore } from '../../store/Store';

function LogoutButton() {
    const { dispatch } = useStore();
    const handleLogout = async (event) => {
        event.preventDefault();
        dispatch({
            type: 'call_api',
        });
        fetchLogout()
            .then((result) => {
                dispatch({
                    type: 'logout_success',
                });
            })
            .catch((error) => {
                dispatch({
                    type: 'error',
                    data: 'Logout error: ' + renderErrorMessage(error.error),
                });
            });
    };

    return (
        <button
            className='text-button'
            onClick={handleLogout}
            aria-label='Logout'
        >
            <div>
                <i className='gg-log-out'></i>
            </div>{' '}
            Logout
        </button>
    );
}

export default LogoutButton;
