import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as actions from '../../store/actions';
import getAPIurl from '../../util/getAPIurl'        

// Async Action

export const fetchEvents = () => {
    return (dispatch, getState) => {
        const state = getState();
        const authData = {headers: {Authorization: (state.authToken)}}
        return axios.get(getAPIurl("events"), authData)
            .then(response => {
                const sortedEvents = sortEvents(response.data)
                localStorage.setItem("events",JSON.stringify(sortedEvents))
                dispatch(fetchEventsSuccess(sortedEvents))
            })
            .catch(error => {
                throw(error);
            });
    }
}

const fetchEventsSuccess = events => {
    return {
        type: actionTypes.EVENTS,
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

export const checkLocalStorageEvents = () => {
    const events = JSON.parse(localStorage.getItem('events'))
    return dispatch => {
        if (events) {
            const sortedEvents = sortEvents(events)
            dispatch(fetchEventsSuccess(sortedEvents))
        } else {
            dispatch(actions.fetchEvents())
        }   
    }
}

// Favorite Events List

export const changeFavsAdd = eventId => {
    return (dispatch, getState) => {
        const state = getState();
        localStorage.setItem("favEvents",JSON.stringify([...state.favEvents, eventId]));
        dispatch(addFavEvent(eventId));
    }
}

export const changeFavsRemove = eventId => {
    return (dispatch, getState) => {
        const state = getState();
        localStorage.setItem("favEvents",JSON.stringify([...state.favEvents, eventId]));
        dispatch(removeFavEvent(eventId));
    }
}

export const checkFavsLocalStorage = () => {
    const favs = JSON.parse(localStorage.getItem('favEvents'))
    return dispatch => {
        if (favs) {
            dispatch(favEventLocalStorage(favs))
        } 
    }
}

export const favEventLocalStorage = favs => {
    return {
        type: actionTypes.FAV_EVENT_LOCAL_STORAGE,
        favs
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