// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/App/AppContainer';
import './index.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import appReducer from './redux/reducer';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const loggerMiddleware = createLogger();
const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(loggerMiddleware, createLogger());
}

const store = createStore(
    appReducer,
    compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : (f: Function) => f
    )
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
