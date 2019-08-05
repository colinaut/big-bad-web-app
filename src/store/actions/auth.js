import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as actions from '../../store/actions';
import * as APIurl from '../../util/APIurl';  

// Auth 

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authToken
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            "username": username,
            "password": password
        }
        axios.post(APIurl.getUrl(APIurl.LOGIN),authData)
        .then(response => {
            const authToken = response.headers.authorization
            localStorage.setItem('authToken',authToken)
            dispatch(authSuccess(authToken))
            dispatch(fetchMyUserData())
            dispatch(fetchMyEvents())
            dispatch(actions.fetchEvents()) //Grab events with complete data
        })
        .catch(err => {console.log(err);dispatch(authFail())})
    }
}

export const checkLocalStorageAuth = () => { //TODO: do I need this?
    const authToken = localStorage.getItem('authToken')
    return dispatch => {
        if (authToken) {
            dispatch(authSuccess(authToken))
        }  
    }
}

export const logout = () => { //TODO remove all non-public data from Redux
    return dispatch => {
        dispatch(authLogout())
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

// Personal User Data

export const fetchMyUserData = () => {
    return (dispatch, getState) => {
        const state = getState();
        const authData = {headers: {Authorization: (state.auth.authToken)}}
        return axios.get(APIurl.getUrl(APIurl.USERS_ME), authData)
            .then(response => {
                const userData = {displayName: response.data.displayName, userNicename: response.data.userNicename, id:response.data.id}
                //transform favorites into simple array of ids
                const favEvents = response.data.bbcUserFavorites.map( fav => fav.eventId.eventId )
                dispatch(fetchMyUserDataSuccess({userData,favEvents}))
            })
            .catch(error => {
                throw(error);
            });
    }
}

export const fetchMyUserDataSuccess = ({userData,favEvents}) => {
    return {
        type: actionTypes.GET_MY_USER_DATA,
        userData,
        favEvents
    }
}

export const fetchMyEvents = () => {
    return (dispatch, getState) => {
        const state = getState();
        const authData = {headers: {Authorization: (state.auth.authToken)}}
        return axios.get(APIurl.getUrl(APIurl.EVENTS_ME), authData)
            .then(response => {
                //transform into simple array of ids
                const myEvents = response.data.map( event => event.eventId )
                dispatch(fetchMyEventsSuccess(myEvents))
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

// Favorite Events List

export const addFavEvent = eventId => {
    return (dispatch, getState) => {
        const state = getState();
        const postData = { eventId: eventId }
        const authData = { headers: {Authorization: (state.auth.authToken)} }
        return axios.post(APIurl.getUrl(APIurl.EVENTS_ME_FAV_CREATE), postData, authData)
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
        const state = getState();
        const postData = { eventId: eventId }
        const authData = { headers: {Authorization: (state.auth.authToken)} }
        return axios.delete(APIurl.getUrl(APIurl.EVENTS_ME_FAV_DELETE), postData, authData)
            .then(response => {
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