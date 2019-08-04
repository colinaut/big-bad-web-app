import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl';  
import unixTime from 'unix-time';

// Async Action

export const fetchEventsPublic = () => {
    return (dispatch) => {
        return axios.get(APIurl.getUrl(APIurl.EVENTS_ALL_PUBLIC))
            .then(response => {
                const sortedEvents = sortEvents(response.data);
                dispatch(fetchEventsPublicSuccess({events:response.data,sortedEvents:sortedEvents}))
            })
            .catch(error => {
                throw(error);
            });
    }
}

const fetchEventsPublicSuccess = ({events,sortedEvents}) => {
    return {
        type: actionTypes.GET_EVENTS_ALL_PUBLIC,
        events: events,
        sortedEvents: sortedEvents,
        epochtime: unixTime(new Date())
      }
}

export const fetchEventsSincePublic = (payload) => {
    const {epochtime} = payload
    return (dispatch) => {
        return axios.get(APIurl.getUrl(APIurl.EVENTS_SINCE_PUBLIC,{epochtime:epochtime}))
            .then(response => {
                console.log(response.data);
                //const sortedEvents = sortEvents(response.data)
                //dispatch(fetchEventsSincePublicSuccess(sortedEvents))
            })
            .catch(error => {
                throw(error);
            });
    }
}

const fetchEventsSincePublicSuccess = ({events,sortedEvents}) => {
    return {
        type: actionTypes.GET_EVENTS_ALL_PUBLIC,
        events: events,
        sortedEvents: sortedEvents,
        epochtime: unixTime(new Date())
      }
}

export const fetchEvents = () => {
    return (dispatch, getState) => {
        const state = getState();
        const authData = {headers: {Authorization: (state.auth.authToken)}}
        return axios.get(APIurl.getUrl(APIurl.EVENTS_ALL), authData)
            .then(response => {
                dispatch(fetchEventsSuccess({events:response.data,sortedEvents:sortEvents(response.data)}))
            })
            .catch(error => {
                throw(error);
            });
    }
}

export const fetchEventsSince = (payload) => { // TODO
    const {epochtime} = payload
    return (dispatch, getState) => {
        const state = getState();
        const authData = {headers: {Authorization: (state.auth.authToken)}}
        return axios.get(APIurl.getUrl(APIurl.EVENTS_SINCE,{epochtime:epochtime}), authData)
            .then(response => {
                //const sortedEvents = sortEvents(response.data)
                //dispatch(fetchEventsSuccess(sortedEvents))
            })
            .catch(error => {
                throw(error);
            });
    }
}

const fetchEventsSuccess = ({events,sortedEvents}) => {
    return {
        type: actionTypes.GET_EVENTS_ALL,
        events: events,
        sortedEvents: sortedEvents,
        epochtime: unixTime(new Date())
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