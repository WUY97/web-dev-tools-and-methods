export const initialState = {
    userDetails: '',
    loading: false,
    error: '',
    page: 'Home',
    showLogin: false,
    showCreatePost: false,
    showSuccessMessage: false,
};

export const actionTypes = {
    CALL_API: 'call_api',
    ERROR: 'error',
    GET_USER_SUCCESS: 'get_user_success',
    GET_USER_FAIL: 'get_user_fail',
    LOGIN_SUCCESS: 'login_success',
    LOGIN_FAIL: 'login_fail',
    LOGOUT_SUCCESS: 'logout_success',
    CREATE_POST_SUCCESS: 'create_post_success',
    CREATE_POST_FAIL: 'create_post_fail',
    DELETE_POST_SUCCESS: 'delete_post_success',
    CREATE_COMMENT_SUCCESS: 'create_comment_success',
    SET_PAGE: 'set_page',
    SET_SHOW_LOGIN: 'set_show_login',
    SET_SHOW_CREATE_POST: 'set_show_create_post',
    FROM_CREATE_POST_TO_MY_POST: 'from_create_post_to_my_post',
    CREATE_ANOTHER_POST: 'create_another_post',
    CLOSE_CREATE_POST: 'close_create_post',
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.CALL_API:
            return { ...state, loading: true };
        case actionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetails: action.data,
                error: '',
            };
        case actionTypes.GET_USER_FAIL:
            return {
                ...state,
                loading: false,
                userDetails: '',
                error: action.data,
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetails: '',
                error: '',
                page: 'Home',
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetails: action.data,
                showLogin: false,
                error: '',
            };
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                showLogin: true,
                error: action.data,
            };
        case actionTypes.CREATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                showCreatePost: true,
                showSuccessMessage: true,
            };
        case actionTypes.CREATE_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.data,
                showCreatePost: true,
                showSuccessMessage: false,
            };
        case actionTypes.DELETE_POST_SUCCESS:
            return { ...state, loading: false, error: '' };
        case actionTypes.CREATE_COMMENT_SUCCESS:
            return { ...state, loading: false, error: '' };
        case actionTypes.ERROR: {
            return {
                ...state,
                loading: false,
                error: action.data,
            };
        }
        case actionTypes.SET_PAGE: {
            return {
                ...state,
                page: action.data,
            };
        }
        case actionTypes.SET_SHOW_LOGIN: {
            return {
                ...state,
                showLogin: action.data,
            };
        }
        case actionTypes.SET_SHOW_CREATE_POST: {
            return {
                ...state,
                showCreatePost: action.data,
            };
        }
        case actionTypes.FROM_CREATE_POST_TO_MY_POST: {
            return {
                ...state,
                page: 'MyPost',
                showCreatePost: false,
                showSuccessMessage: false,
            };
        }
        case actionTypes.CREATE_ANOTHER_POST: {
            return {
                ...state,
                showCreatePost: true,
                showSuccessMessage: false,
            };
        }
        case actionTypes.CLOSE_CREATE_POST: {
            return {
                ...state,
                showCreatePost: false,
                showSuccessMessage: false,
            }
        }
        default:
            return state;
    }
};
