import { useStore } from '../../store/Store';

function LoginButton() {
    const { dispatch } = useStore();

    return (
        <button
            className='text-button'
            onClick={() =>
                dispatch({
                    type: 'set_show_login',
                    data: true,
                })
            }
            aria-label='Go to login page'
        >
            <div>
                <i className='gg-log-in'></i>
            </div>
            Login
        </button>
    );
}

export default LoginButton;
