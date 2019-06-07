import * as actionTypes from './actions/actionTypes';

const initialState = {
    blog: [],
    events: [],
    loginStatus: false,
    token: ""
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.BLOG:
            return {...state, blog: action.blog}
        case actionTypes.EVENTS:
            return {...state, events: action.events}
        case actionTypes.AUTH_SUCCESS:
            return {...state, token: action.token, loginStatus: true}
        default: return state
    }
}

export default reducer