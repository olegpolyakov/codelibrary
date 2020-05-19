import * as db from '@/api/db';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'GET_LISTS':
            return {
                ...state,
                list: action.payload.lists
            };

        case 'GET_LIST':
            return {
                ...state,
                single: action.payload.list
            };

        case 'CREATE_LIST':
            return state;

        case 'UPDATE_LIST':
            return state;

        case 'DELETE_LIST':
            return state;

        default:
            return state;
    }
}

export function getLists(userId) {
    return db.getLists(userId)
        .then(lists => ({
            type: 'GET_LISTS',
            payload: {
                lists
            }
        }));
}

export function getList(listId) {
    return db.getList(listId)
        .then(list => ({
            type: 'GET_LIST',
            payload: {
                list
            }
        }));
}

export function createList(data) {
    return db.createList(data)
        .then(list => ({
            type: 'CREATE_LIST',
            payload: {
                list
            }
        }));
}

export const actions = {
    getLists,
    getList,
    createList
};