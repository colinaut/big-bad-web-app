import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as actions from '../../store/actions';
import getAPIurl from '../../util/getAPIurl'

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
        axios.post(getAPIurl("login"),authData)
        .then(response => {
            const authToken = response.headers.authorization
            localStorage.setItem('authToken',authToken)
            dispatch(authSuccess(authToken))
            dispatch(actions.fetchEvents())
        })
        .catch(err => {console.log(err);dispatch(authFail())})
    }
}

export const checkLocalStorageAuth = () => {
    const authToken = localStorage.getItem('authToken')
    return dispatch => {
        if (authToken) {
            dispatch(authSuccess(authToken))
        }  
    }
}

export const logout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("events")
    return dispatch => {
        dispatch(authLogout())
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

