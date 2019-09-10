import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl';
import unixTime from 'unix-time';

// Async Action

export const fetchPage = (id) => {
    return dispatch => {
        return axios.get(APIurl.getUrl(APIurl.PAGES) + '/' +id)
            .then(response => {
                dispatch(fetchPageSuccess({id:id,page:response.data}))
            })
            .catch(error => {
                throw(error);
            });
    }
}

export const fetchMenus = (slug) => {
    const specificMenu = slug ? `/${slug}` : '';
    return dispatch => {
        return axios.get(APIurl.getUrl(APIurl.MENUS) + specificMenu)
            .then(response => {
                dispatch(fetchMenuSuccess(response.data))
            })
            .catch(error => {
                throw(error);
            });
    }
}

// Action Middleware

export const fetchPageSuccess = (payload) => {
    const {id,page} = payload
    return {
        type: actionTypes.GET_PAGE,
        id,
        page,
        epochtime: unixTime(new Date())
      }
}

export const fetchMenuSuccess = (menu) => {
    return {
        type: actionTypes.GET_MENU,
        menu,
        epochtime: unixTime(new Date())
      }
}