import axios from 'axios'
import * as actionTypes from './actionTypes';
import getAPIurl from '../../util/getAPIurl'

// Async Action

export const fetchBlog = () => {
    return dispatch => {
        return axios.get(getAPIurl("posts"))
            .then(response => {
                dispatch(fetchBlogSuccess(response.data))
            })
            .catch(error => {
                throw(error);
            });
    }
}

// Action Middleware

export const fetchBlogSuccess = (blog) => {
    return {
        type: actionTypes.BLOG,
        blog
      }
}