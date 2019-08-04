import axios from 'axios'
import * as actionTypes from './actionTypes';
import getAPIurl from '../../util/getAPIurl';     

// Async Action

export const fetchEventsPublic = () => {
    return (dispatch) => {
        return axios.get(getAPIurl("events all public"))
            .then(response => {
                const sortedEvents = sortEvents(response.data)
                dispatch(fetchEventsPublicSuccess(sortedEvents))
            })
            .catch(error => {
                throw(error);
            });
    }
}

const fetchEventsPublicSuccess = events => {
    return {
        type: actionTypes.GET_EVENTS_ALL_PUBLIC,
        events
      }
}

export const fetchEvents = () => {
    return (dispatch, getState) => {
        const state = getState();
        const authData = {headers: {Authorization: (state.auth.authToken)}}
        return axios.get(getAPIurl("events all"), authData)
            .then(response => {
                const sortedEvents = sortEvents(response.data)
                dispatch(fetchEventsSuccess(sortedEvents))
            })
            .catch(error => {
                throw(error);
            });
    }
}

const fetchEventsSuccess = events => {
    return {
        type: actionTypes.GET_EVENTS_ALL,
        events
      }
}

const sortEvents = events => {
    return events.sort((a, b) => {
        if (a.eventStartDate > b.eventStartDate) {
            return 1
        } else if (a.eventStartDate === b.eventStartDate) {
            if (a.eventStartTime > b.eventStartTime) {
                return 1
            } else if (a.eventStartTime === b.eventStartTime) {
                if (a.eventName > b.eventName) {
                    return 1
                } else {return -1}
            } else {return -1}
        } else {return -1}

    }) 
}

// Favorite Events List

export const changeFavsAdd = eventId => {
    return (dispatch) => {
        dispatch(addFavEvent(eventId));
    }
}

export const changeFavsRemove = eventId => {
    return (dispatch) => {
        dispatch(removeFavEvent(eventId));
    }
}

export const addFavEvent = eventId => {
    return {
        type: actionTypes.ADD_FAV_EVENT,
        eventId
    }
}

export const removeFavEvent = eventId => {
    return {
        type: actionTypes.REMOVE_FAV_EVENT,
        eventId
      }
}