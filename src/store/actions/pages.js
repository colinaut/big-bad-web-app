import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl'

// Async Action

export const fetchPage = (id) => {
    return dispatch => {
        return axios.get(APIurl.getUrl(APIurl.PAGES) + '/' +id)
            .then(response => {
                console.log(response.data);
                dispatch(fetchPageSuccess(response.data))
            })
            .catch(error => {
                throw(error);
            });
    }
}

// Action Middleware

export const fetchPageSuccess = (page) => {
    return {
        type: actionTypes.GET_PAGE,
        page
      }
}