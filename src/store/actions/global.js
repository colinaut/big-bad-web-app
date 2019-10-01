import * as actionTypes from './actionTypes';
import * as actions from '../../store/actions';

export const setAlert = (payload) => {
    if (payload) {
        let alertType, message

        if (typeof payload === 'string') {
            alertType = 'info'
            message = payload
        } else {
            alertType = payload.alertType || 'info'
            message = payload.message
        }

        return {
            type: actionTypes.TRIGGER_ALERT,
            alertType: alertType,
            message
        }

    } else return { type: actionTypes.CLEAR_ALERT }
    
}

export const APIfailure = ({error,messageStart}) => dispatch => {
    messageStart = messageStart || 'Error';
    dispatch({type: actionTypes.API_FAILURE})

    if (error.message.match(/403/g)) { 
        dispatch(actions.logout()) 
        dispatch(actions.setAlert({alertType: 'error', message: 'Authorization failed. Please log in again'}))
    } else {
        dispatch(actions.setAlert({alertType: 'error', message: messageStart + error.message}))
    }
    throw(error);
}