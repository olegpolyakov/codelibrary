import * as db from 'api/db';

export default function reducer(state = [], action) {
    switch (action.type) {
        case 'GET_TOPICS':
            return action.payload.topics;

        default:
            return state;
    }
}

export function getTopics() {
    return db.getTopics()
        .then(topics => ({
            type: 'GET_TOPICS',
            payload: {
                topics
            }
        }));
}