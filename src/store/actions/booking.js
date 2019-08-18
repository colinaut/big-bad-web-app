import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl';  
import {authToken} from './auth'

// Favorite Events List

export const addFavEvent = eventId => {
    return (dispatch, getState) => {
        const postData = { eventId: eventId }
        const config = { headers: authToken(getState) }
        return axios.post(APIurl.getUrl(APIurl.EVENTS_ME_FAV_CREATE), postData, config)
            .then(response => {
                dispatch(addFavEventSuccess(eventId));
            })
            .catch(error => {
                throw(error);
            });
    }
}

export const deleteFavEvent = eventId => {
    return (dispatch, getState) => {
        const postData = { eventId: eventId }
        return axios({
            method: 'DELETE',
            url: APIurl.getUrl(APIurl.EVENTS_ME_FAV_DELETE),
            headers: authToken(getState),
            data: postData
        }).then(response => {
                dispatch(deleteFavEventSuccess(eventId));
            })
            .catch(error => {
                throw(error);
            });
    }
}

export const addFavEventSuccess = eventId => {
    return {
        type: actionTypes.ADD_FAV_EVENT,
        eventId
    }
}

export const deleteFavEventSuccess = eventId => {
    return {
        type: actionTypes.REMOVE_FAV_EVENT,
        eventId
      }
}

//My Events & Bookings

export const fetchMyEvents = () => {
    return (dispatch, getState) => {
        const config = { headers: authToken(getState) }
        return axios.get(APIurl.getUrl(APIurl.EVENTS_ME), config)
            .then(response => {
                dispatch(fetchMyEventsSuccess(response.data))
            })
            .catch(error => {
                throw(error);
            });
    }
}

export const fetchMyEventsSuccess = (myEvents) => {
    return {
        type: actionTypes.GET_MY_EVENTS,
        myEvents
    }
}

export const bookMeIntoGame = eventId => {
    return (dispatch, getState) => {
        const postData = { gameId: eventId }
        const config = { headers: authToken(getState) }
        return axios.post(APIurl.getUrl(APIurl.BOOKINGS_BOOK_ME_INTO_GAME), postData, config)
            .then(response => {
                dispatch(bookMeIntoGameSuccess(eventId));
            })
            .catch(error => {
                throw(error);
            });
    }
}

export const bookMeIntoGameSuccess = eventId => {
    return {
        type: actionTypes.BOOK_ME_INTO_GAME,
        eventId
    }
}

export const unbookMeFromGame = eventId => {
    return (dispatch,getState) => {
        
    }
}

export const fetchMyAvailableGameSlots = () => {
    return (dispatch,getState) => {
        const config = { headers: authToken(getState) }
        return axios.get(APIurl.getUrl(APIurl.BOOKINGS_MY_AVAILABLE_GAME_SLOTS), config)
            .then(response => {
                dispatch({
                    type: actionTypes.GET_MY_AVAILABLE_GAME_SLOTS,
                    myAvailableGameSlots: response.data
                })
            })
            .catch(error => {
                throw(error);
            });
    }
}