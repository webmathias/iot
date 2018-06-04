import React from 'react';
import AppRouter from '../../router/AppRouter';
import {createStore, applyMiddleware,} from 'redux'
import {Provider} from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware'
import appReducers from './appReducers';

import './App.css'
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import Login from '../login/Login'
import {login} from '../login/loginActions'


let store = applyMiddleware(promiseMiddleware())(createStore)(appReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const App = props => (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

export default App;