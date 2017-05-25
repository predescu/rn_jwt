import { AsyncStorage } from 'react-native';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    AUTH_CHECK,
    LOGIN_USER_ATTEMPT,
    LOGIN_USER_LOADING,
    LOGIN_USER_TOKEN_REFRESHED
} from './types';

// Using AsyncStorage
// AsyncStorage.setItem('token', token);
// AsyncStorage.getItem('token');
export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const authCheck = () => {
    // AsyncStorage.removeItem('api_token');
    return async (dispatch) => {
        let apiToken = await AsyncStorage.getItem('api_token');
        if (apiToken) {
            console.log(apiToken);
            refreshToken(apiToken, dispatch);
        } else {
            dispatch({
                type: AUTH_CHECK,
                payload: null
            });
        }
    };
};

export const refreshToken = (oldToken, dispatch) => {
    console.log('inside refresh token');
    const myApiUrl = 'http://192.168.1.71/api/user/refresh';
    const obj = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oldToken}`
            // 'Origin': '',
            // 'Host': '192.168.1.71/api/user/login'
        }
    };
    console.log('start fetch');
    return dispatch({
        fetch(`${myApiUrl}`, obj)
        .then(response =>
            response.json()
            .then((data) => ({
                data,
                status: response.status
            })
            ).then((res) => {
                console.log(res.api_token);
                dispatch({
                        type: LOGIN_USER_TOKEN_REFRESHED,
                        payload: res
                });
            })
        );
    });        
};

// export const authCheck = () => async dispatch => {
//     // AsyncStorage.removeItem('api_token');
//     let apiToken = await AsyncStorage.getItem('api_token');
//     if (apiToken) {
//         refreshToken(apiToken);
//     } else {
//         dispatch({ type: AUTH_CHECK, payload: apiToken });
//     }
// };

export const loginUser = ({ email, password }) => {
    console.log('logging user');
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_LOADING, payload: { loading: true, error: '' } });

        const myApiUrl = 'http://192.168.1.71/api/user/login';
        const obj = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'Origin': '',
                // 'Host': '192.168.1.71/api/user/login'
            },
            body: JSON.stringify({
                email,
                password
            })
        };

        fetch(`${myApiUrl}`, obj)
        .then(response =>
            response.json()
            .then((data) => ({
                data,
                status: response.status
            })
            ).then((res) => {
                console.log(res);
                const result = {
                    error: '', api_token: null, user: '', email: '', password: '', loading: false
                };
                if (res.status === 401) {
                    result.error = 'Invalid Credentials';
                    result.email = email;
                }
                if (res.status === 200) {
                    result.api_token = res.data.token;
                    result.user = res.data.user;
                }
                if (result.api_token) {
                    storeApiToken(result, dispatch);
                } else {
                    dispatch({
                        type: LOGIN_USER_ATTEMPT,
                        payload: result
                    });
                }
            })
        ).catch((error) => {
            console.error(error);
        });
    };
};

const storeApiToken = async (result, dispatch) => {
    await AsyncStorage.setItem('api_token', result.api_token);
    return dispatch({ type: LOGIN_USER_ATTEMPT, payload: result });
};
