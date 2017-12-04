import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';


const enhancer = applyMiddleware(routerMiddleware, thunk, logger);

const store = createStore(reducer, enhancer);
//dev only
window.store = store;

export default store;