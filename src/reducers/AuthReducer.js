import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_ATTEMPT,
    LOGIN_USER_LOADING,
    AUTH_CHECK,
    LOGIN_USER_TOKEN_REFRESHED
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    error: '',
    api_token: '',
    user: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case AUTH_CHECK:
            return { ...state, api_token: action.payload };
        case LOGIN_USER_ATTEMPT:
            return { ...state,
                api_token: action.payload.api_token,
                error: action.payload.error,
                email: action.payload.email,
                password: action.payload.password,
                user: action.payload.user,
                loading: action.payload.loading
            };
        case LOGIN_USER_TOKEN_REFRESHED:
            return {
                ...state, user: action.payload.user, api_token: action.payload.api_token
            };
        case LOGIN_USER_LOADING:
            return { ...state, loading: action.payload.loading, error: action.payload.error };
        default:
            return state;
    }
};
