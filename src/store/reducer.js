import * as actionTypes from './actions/actionTypes';

const initialState = {
    blog: [],
    events: [],
    authStatus: false,
    authToken: "",
    error: ""
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.BLOG:
            return {...state, blog: action.blog}
        case actionTypes.EVENTS:
            return {...state, events: action.events}
        case actionTypes.AUTH_SUCCESS:
            return {...state, authToken: action.authToken, authStatus: true}
        default: return state
    }
}

export default reducer