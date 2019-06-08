import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as actions from '../../store/actions';

// Async Action

const allEventsUrl = 'https://www.bigbadcon.com:8091/api/events/all'

export const fetchEvents = () => {
    return (dispatch, getState) => {
        const state = getState();
        const authData = {headers: {Authorization: (state.authToken)}}
        return axios.get(allEventsUrl, authData)
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
    return events.sort((a, b) => (a.eventStartDate > b.eventStartDate) ? 1 : (a.eventStartDate === b.eventStartDate) ? ((a.eventStartTime > b.eventStartTime) ? 1 : ((a.eventName > b.eventName) ? 1 : -1 )) : -1 )
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