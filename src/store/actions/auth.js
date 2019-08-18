import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl';  
import * as actions from '../../store/actions';

// Auth 

// function to return Axios auth header
export const authToken = (getState) => {
    const auth = getState().auth
    return { headers: { Authorization: (auth.authToken) } }
}

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
            dispatch(actions.fetchEvents()) //Grab events with complete logged in available data
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
        return axios.get(APIurl.getUrl(APIurl.USERS_ME), authToken(getState))
            .then(response => {
                const allData = response.data
                const userData = {displayName: allData.displayName, userNicename: allData.userNicename, id:allData.id}
                const favEvents = allData.bbcUserFavorites.map(fav => fav.eventId)

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
export const fetchMyUserDataSuccess2 = ({userData,allData}) => {
    return {
        type: actionTypes.GET_MY_USER_DATA,
        userData,
        allData
    }
}

export const fetchMyEvents = () => {
    return (dispatch, getState) => {
        return axios.get(APIurl.getUrl(APIurl.EVENTS_ME), authToken(getState))
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

// Favorite Events List

export const addFavEvent = eventId => {
    return (dispatch, getState) => {
        const postData = { eventId: eventId }
        return axios.post(APIurl.getUrl(APIurl.EVENTS_ME_FAV_CREATE), postData, authToken(getState))
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
        return axios.delete(APIurl.getUrl(APIurl.EVENTS_ME_FAV_DELETE), postData, authToken(getState))
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

//Booking

export const bookMeIntoGame = eventId => {
    return (dispatch, getState) => {
        const postData = { gameId: eventId }
        return axios.post(APIurl.getUrl(APIurl.BOOKINGS_BOOK_ME_INTO_GAME), postData, authToken(getState))
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
