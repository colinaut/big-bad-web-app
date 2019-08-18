import * as actionTypes from '../actions/actionTypes';

export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {...state, authToken: action.authToken, authStatus: true}
        case actionTypes.AUTH_LOGOUT:
            return {...state, authToken: "", authStatus: false}
        case actionTypes.GET_MY_USER_DATA:
            return {...state, userData: action.userData, favEvents:action.favEvents}
        case actionTypes.GET_MY_EVENTS:
            return {...state, myEvents: action.myEvents}
        case actionTypes.ADD_FAV_EVENT:
            return {...state, favEvents: [...state.favEvents, action.eventId]}
        case actionTypes.REMOVE_FAV_EVENT:
            return {...state, favEvents: state.favEvents.filter(item => action.eventId !== item)} 
        case actionTypes.BOOK_ME_INTO_GAME:
            return {...state, myEvents:[...state.myEvents, action.eventId]}
        default: return state
    }
}

export default authReducer
