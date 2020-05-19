import * as db from '@/api/db';

export default function reducer(state = null, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.payload.user;

        case 'LOGOUT_USER':
            return null;

        case 'GET_USER':
            return {
                ...state,
                ...action.payload.user
            };

        default:
            return state;
    }
}

export function login(user) {
    return {
        type: 'LOGIN_USER',
        payload: {
            user
        }
    };
}

export function logout() {
    return {
        type: 'LOGOUT_USER'
    };
}

export function getUser(userId) {
    return db.getUser(userId)
        .then(user => ({
            type: 'GET_USER',
            payload: {
                user
            }
        }));
}