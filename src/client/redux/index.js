import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import auth from './auth';
import smoke from './smoke';

export default createStore(
	combineReducers({ auth, smoke }),
	composeWithDevTools(applyMiddleware(thunk))
);
