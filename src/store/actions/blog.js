import axios from 'axios'
import * as actionTypes from './actionTypes';

// Async Action

const blogPosts = 'https://bigbadcon.com/wp-json/wp/v2/posts'

export const fetchBlog = () => {
    return dispatch => {
        return axios.get(blogPosts)
            .then(response => {
                // Dispatch another action
                // to consume data
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