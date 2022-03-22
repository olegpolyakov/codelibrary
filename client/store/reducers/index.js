import { combineReducers } from 'redux';

import books from './books';
import lists from './lists';
import topics from './topics';
import user from './user';

export default combineReducers({
    books,
    lists,
    topics,
    user
});