import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl'

// Async Action

export const fetchBlog = () => {
    return dispatch => {
        return axios.get(APIurl.getUrl(APIurl.POSTS))
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
        type: actionTypes.GET_BLOG,
        blog
      }
}