import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import thunk from 'redux-thunk';

import {fetchBlog,checkLocalStorageAuth} from './store/actions/'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers( applyMiddleware(thunk)));

store.dispatch(fetchBlog());
store.dispatch(checkLocalStorageAuth());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
