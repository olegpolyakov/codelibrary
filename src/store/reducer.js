import { combineReducers } from 'redux';

import user from './user';
import books from './books';

export default combineReducers({
    user,
    books
});