import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl';  
import * as actions from '../../store/actions';

// Auth 

// function to return Axios auth header
export const authToken = (getState) => {
    const auth = getState().auth
    return auth.authToken ? { Authorization: (auth.authToken) } : null
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
            // Get User Data including fav events
            dispatch(actions.fetchMyUserData())
            // Check to see if user is Admin
            dispatch(isAdmin());
            // Get Users Available Game Slots
            dispatch(actions.fetchMyAvailableGameSlots())
            // Get User's Fav Events
            dispatch(actions.fetchFavEvents());
            // Get User's Events
            dispatch(actions.fetchMyEvents())
            //Grab events with complete logged in available data
            dispatch(actions.fetchEventsSince({epochtime:'1546321746'})) 
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

export const logout = () => { 
    return dispatch => {
        dispatch(authLogout());
        dispatch(actions.fetchEvents()) // TODO: Revise so it just purges booking data rather than grabs again?
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
        const config = { headers: authToken(getState) }
        return axios.get(APIurl.getUrl(APIurl.USERS_ME), config )
            .then(response => {
                const allData = response.data
                const userData = {displayName: allData.displayName, userNicename: allData.userNicename, id:allData.id}

                dispatch({
                    type: actionTypes.GET_MY_USER_DATA,
                    userData
                })
            })
            .catch(error => {
                throw(error);
            });
    }
}

export const isAdmin = () => {
    return (dispatch, getState) => {
        const config = { headers: authToken(getState) }
        return axios.get(APIurl.getUrl(APIurl.IS_ADMIN), config )
            .then(response => {
                const isAdmin = response.data

                dispatch({
                    type: actionTypes.IS_ADMIN,
                    isAdmin
                })
            })
            .catch(error => {
                throw(error);
            });
    }
}