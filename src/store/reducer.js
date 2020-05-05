import { combineReducers } from 'redux';

import user from './user';
import books from './books';
import lists from './lists';
import topics from './topics';

export default combineReducers({
    user,
    books,
    lists,
    topics
});