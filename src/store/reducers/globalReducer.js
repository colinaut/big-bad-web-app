import * as actionTypes from '../actions/actionTypes';
//import update from 'immutability-helper';

export const globalReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.TRIGGER_ALERT:
            return {...state, alert: { alertType: action.alertType, message: action.message } }
        case actionTypes.CLEAR_ALERT:
            return {...state, alert: null }
        default: return state
    }
}

export default globalReducer
