import axios from 'axios'
import * as actionTypes from './actionTypes';

// Auth 

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token
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
        axios.post('https://www.bigbadcon.com:8091/api/login',authData)
        .then(response => {
            dispatch(authSuccess(response.headers.authorization))
        })
        .catch(err => {console.log(err);dispatch(authFail())})
    }
}