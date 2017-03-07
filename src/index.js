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
import * as utils from './framework/utils';
import constants from './framework/constants';

const loggerMiddleware = createLogger();
const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(loggerMiddleware);
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
    <AppContainer utils={utils} queryConfig={constants.queryConfig}/>
  </Provider>,
  document.getElementById('root')
);
