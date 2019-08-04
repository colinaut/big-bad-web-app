import * as actionTypes from '../actions/actionTypes';

export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {...state, authToken: action.authToken, authStatus: true}
        case actionTypes.AUTH_LOGOUT:
            return {...state, authToken: "", authStatus: false}
        default: return state
    }
}

export default authReducer
