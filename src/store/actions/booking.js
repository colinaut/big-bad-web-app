import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl';  
import {authToken} from './auth';
import * as actions from '../../store/actions';

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
                if (error.message.match(/403/g)) { dispatch(actions.logout()) }
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
                if (error.message.match(/403/g)) { dispatch(actions.logout()) }
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
                if (error.message.match(/403/g)) { dispatch(actions.logout()) }
                throw(error);
            });
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
                if (error.message.match(/403/g)) { dispatch(actions.logout()) }
                throw(error);
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
        .catch(error => {
            if (error.message.match(/403/g)) { dispatch(actions.logout()) }
            throw(error);
        });
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
            .catch(error => {
                if (error.message.match(/403/g)) { dispatch(actions.logout()) }
                throw(error);
            });
    }
}

const fetchMyAvailableGameSlotsSuccess = myAvailableGameSlots => {
    return {
        type: actionTypes.SET_MY_AVAILABLE_GAME_SLOTS,
        myAvailableGameSlots
    }
}