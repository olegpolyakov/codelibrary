import api from '@/services/api';

export default function reducer(state = null, action) {
    switch (action.type) {
        case 'GET_USER':
            return action.payload.user;

        default:
            return state;
    }
}

export function getUser() {
    return api.get('/user')
        .then(user => ({
            type: 'GET_USER',
            payload: {
                user
            }
        }));
}