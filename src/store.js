import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  ));

const store = createStore(reducer, middleware);  

export default store;
