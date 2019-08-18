import * as actionTypes from '../actions/actionTypes';

export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {...state, authToken: action.authToken, authStatus: true}
        case actionTypes.AUTH_LOGOUT:
            return {...state, authToken: "", authStatus: false}
        case actionTypes.GET_MY_USER_DATA:
            return {...state, userData: action.userData, favEvents:action.favEvents}
        default: return state
    }
}

export default authReducer
