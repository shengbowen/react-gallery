import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createLogger from 'redux-logger';

import stage from '../reducers/stage';

const reducer = combineReducers({ stage });

let enhancer;

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  enhancer = compose(
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Hook for Redux DevTools Extension. see https://github.com/zalmoxisus/redux-devtools-extension
  )
} else {
  enhancer = null;
}

export default createStore(reducer, {}, enhancer);