import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createLogger from 'redux-logger';

import stage from '../reducers/stage';

const reducer = combineReducers({ stage });

let enhancer;

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  enhancer = compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f, // Hook for Redux DevTools Extension. see https://github.com/zalmoxisus/redux-devtools-extension
  )
} else {
  enhancer = null;
}

export default createStore(reducer, {}, enhancer);