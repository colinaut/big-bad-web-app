import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import * as reducers from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    events: reducers.eventsReducer,
    blog: reducers.blogReducer,
    auth: reducers.authReducer
})

const persistConfig = {
    key: 'root',
    storage,
    //blacklist: ['auth'] //TODO test blacklisting auth to see if this is what I want to do
}

// Create store with reducers and initial state
const initialState = {
    events: {},
    blog: {},
    auth: {}
}

// Add BOTH store enhancers when making store creator
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer, 
    initialState, 
    composeEnhancers( applyMiddleware(thunk) )
)
export const persistor = persistStore(store)