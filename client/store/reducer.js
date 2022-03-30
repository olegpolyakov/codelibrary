import { combineReducers } from 'redux';

import books from './modules/books';
import lists from './modules/lists';
import topics from './modules/topics';
import user from './modules/user';

export default combineReducers({
    books,
    lists,
    topics,
    user
});