// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import appReducer from './reducer';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const loggerMiddleware = createLogger();
const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(loggerMiddleware, createLogger());
}

ReactDOM.render(
  <Provider store={createStore(appReducer, applyMiddleware(...middlewares))}>
    <App />
  </Provider>,
  document.getElementById('root')
);
