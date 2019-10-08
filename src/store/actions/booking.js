import axios from 'axios'

import {authToken} from './auth';
import {dynamicSortMultiple} from '../../util/helpers'
import * as actions from '../../store/actions';
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl';

//import Moment from 'moment';
//import { extendMoment } from 'moment-range';
 
//const moment = extendMoment(Moment);

// Favorite Events List

export const fetchFavEvents = () => {
    return (dispatch, getState) => {
        const authHeader = authToken(getState)
        if (authHeader) {
            const url = APIurl.getUrl(APIurl.EVENTS_ME_FAV)
            const config = { headers: authHeader }
            return axios.get(url, config)
                .then(response => {
                    const favEvents = response.data.map(fav => fav.eventId)
                    dispatch({
                        type: actionTypes.SET_MY_FAV_EVENTS,
                        favEvents
                    })
                })
                .catch(error => dispatch(actions.APIfailure({error: error, messageStart: 'fetchFavEvents error'})));
        } else console.log('not logged in')      
    }
}

export const addFavEvent = eventId => {
    return (dispatch, getState) => {
        const postData = { eventId: eventId }
        const config = { headers: authToken(getState) }
        return axios.post(APIurl.getUrl(APIurl.EVENTS_ME_FAV_CREATE), postData, config)
            .then(response => {
                dispatch(addFavEventSuccess(eventId));
            })
            .catch(error => dispatch(actions.APIfailure({error: error, messageStart: 'addFavEvent error'})));
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
            .catch(error => dispatch(actions.APIfailure({error: error, messageStart: 'deleteFavEvent error'})));
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
                dispatch(sortMyEvents(response.data))
            })
            .catch(error => dispatch(actions.APIfailure({error: error, messageStart: 'fetchMyEvents error'})));
    }
}

export const sortMyEvents = (myEvents) => {

    return (dispatch, getState) => {
        const eventsById = getState().events.eventsById;
        
        const myEventsWithDate = myEvents.map(event => {
            return {
                eventId: event,
                eventStartDate: eventsById[event].eventStartDate,
                eventEndDate: eventsById[event].eventEndDate,
                eventStartTime: eventsById[event].eventStartTime,
                eventEndTime: eventsById[event].eventEndTime,
                eventName: eventsById[event].eventName
            }
        })
        const sortedMyEvents = [...myEventsWithDate].sort(dynamicSortMultiple('eventStartDate','eventStartTime','eventName')).map(event => event.eventId)

        dispatch(fetchMyEventsSuccess(sortedMyEvents))
    }
}

export const fetchMyEventsSuccess = (myEvents) => {
    return {
        type: actionTypes.SET_MY_EVENTS,
        myEvents
    }
}

export const bookMeIntoGame = eventId => {
    return (dispatch, getState) => {
        const postData = { gameId: eventId }
        const config = { headers: authToken(getState) }
        // Preventatively remove from available game slots. Doing this to make sure users can't double book by clicking fast
        const myAvailableGameSlots = getState().booking.myAvailableGameSlots;
        const event = getState().events.eventsById[eventId];
        const exempt = event.metadata.exempt

        if (!exempt) { dispatch(fetchMyAvailableGameSlotsSuccess(myAvailableGameSlots-1)) }

        return axios.post(APIurl.getUrl(APIurl.BOOKINGS_BOOK_ME_INTO_GAME), postData, config)
            .then(response => {
                dispatch(bookMeIntoGameSuccess(eventId));
                dispatch(actions.fetchEvent(eventId));
            })
            .catch(error => {
                // If fails then revert Available Game Slots as long as it's not exempt
                if (!exempt) { dispatch(fetchMyAvailableGameSlotsSuccess(getState().booking.myAvailableGameSlots)+1)}
                dispatch(actions.APIfailure({error: error, messageStart: 'bookMeIntoGame error'}))
            });
    }
}

const bookMeIntoGameSuccess = eventId => {
    return {
        type: actionTypes.BOOK_ME_INTO_GAME,
        eventId
    }
}

export const removeMeFromGame = eventId => {
    return (dispatch,getState) => {
        const postData = { gameId: eventId }

        const myAvailableGameSlots = getState().booking.myAvailableGameSlots;
        const event = getState().events.eventsById[eventId];
        const exempt = event.metadata.exempt

        return axios({
            method: 'DELETE',
            url: APIurl.getUrl(APIurl.BOOKINGS_REMOVE_ME_FROM_GAME),
            headers: authToken(getState),
            data: postData
        })
        .then(response => {
            console.log(response)
            dispatch(removeMeFromGameSuccess(eventId));
            if (!exempt) { dispatch(fetchMyAvailableGameSlotsSuccess(myAvailableGameSlots+1)) }
            dispatch(actions.fetchEvent(eventId));
        })
        .catch(error => dispatch(actions.APIfailure({error: error, messageStart: 'removeMeFromGame error'})));
    }
}

const removeMeFromGameSuccess = eventId => {
    return {
        type: actionTypes.REMOVE_ME_FROM_GAME,
        eventId
    }
}

export const fetchMyAvailableGameSlots = () => { //TODO: make sure it grabs this more often like events as we up game slots.
    return (dispatch,getState) => {
        const config = { headers: authToken(getState) }
        return axios.get(APIurl.getUrl(APIurl.BOOKINGS_MY_AVAILABLE_GAME_SLOTS), config)
            .then(response => {
                dispatch(fetchMyAvailableGameSlotsSuccess(response.data))
            })
            .catch(error => dispatch(actions.APIfailure({error: error, messageStart: 'fetchMyAvailableGameSlots error'})));
    }
}

const fetchMyAvailableGameSlotsSuccess = myAvailableGameSlots => {
    return {
        type: actionTypes.SET_MY_AVAILABLE_GAME_SLOTS,
        myAvailableGameSlots
    }
}