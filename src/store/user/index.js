export default function reducer(state = null, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.payload.user;

        case 'LOGOUT_USER':
            return null;

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