import api from '@/services/api';

export function getTopics() {
    return api.get('/topics')
        .then(topics => ({
            type: 'GET_TOPICS',
            payload: {
                topics
            }
        }));
}

export function markTopic(topic, userId) {
    const data = {
        markedBy: topic.markedBy ? (
            topic.markedBy.includes(userId) ?
                topic.markedBy.filter(id => id !== userId) :
                topic.markedBy.concat(userId)
        ) : [userId]
    };

    return db.updateTopic(topic.id, data)
        .then(topic => ({
            type: 'MARK_TOPIC',
            payload: {
                topic
            }
        }));
}

export const actions = {
    getTopics,
    markTopic
};

export default function reducer(state = [], action) {
    switch (action.type) {
        case 'GET_TOPICS':
            return action.payload.topics;

        case 'MARK_TOPIC':
            return state.map(topic => topic.id !== action.payload.topic.id ? topic : action.payload.topic);

        default:
            return state;
    }
}