import * as actionTypes from '../actions/actionTypes';

export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {...state, authToken: action.authToken, authStatus: true}
        case actionTypes.CORDOVA_AUTH_SUCCESS:
            return {...state, cordovaAuthHeader: action.authHeader}
        case actionTypes.AUTH_LOGOUT:
            return {}
        case actionTypes.GET_MY_USER_DATA:
            return {...state, userData: action.userData, favEvents:action.favEvents, allUserData: action.allData}
        case actionTypes.IS_ADMIN:
            return {...state, isAdmin: action.isAdmin}
        default: return state
    }
}

export default authReducer
