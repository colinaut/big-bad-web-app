import * as actionTypes from './actions/actionTypes';

const initialState = {
    blog: [],
    events: [],
    authStatus: false,
    authToken: "",
    error: "",
    favEvents: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.BLOG:
            return {...state, blog: action.blog}
        case actionTypes.EVENTS:
            return {...state, events: action.events}
        case actionTypes.AUTH_SUCCESS:
            return {...state, authToken: action.authToken, authStatus: true}
        case actionTypes.ADD_FAV_EVENT:
            return {...state, favEvents: [...state.favEvents, action.eventId]} //Need to fix
        case actionTypes.REMOVE_FAV_EVENT:
            return {...state, favEvents: state.favEvents.filter(item => action.eventId !== item)} //Need to fix
        default: return state
    }
}

export default reducer
