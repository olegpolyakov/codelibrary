import { createStore } from 'redux';

import state from './state';
import reducer from './reducers';
import middleware from './middleware';

export default createStore(reducer, state, middleware);