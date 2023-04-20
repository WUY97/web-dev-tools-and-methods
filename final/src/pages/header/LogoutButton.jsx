import { fetchLogout } from '../../shared/utils/services';
import renderErrorMessage from '../../shared/utils/renderErrorMessage';

function LogoutButton({ setUsername, setLoggedIn, setIsLoading, setErrorMessage }) {
    const handleLogout = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        fetchLogout()
            .then((result) => {
                setLoggedIn(false);
                setUsername('');
            })
            .catch((error) => {
                setErrorMessage('Logout error: ' + renderErrorMessage(error.error));
            })
            .finally(() => {
                setIsLoading(false);
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
