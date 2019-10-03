import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl';
import moment from 'moment'
import * as actions from '../../store/actions';

// Async Action

export const fetchPage = (id) => {
    return dispatch => {
        return axios.get(APIurl.getUrl(APIurl.PAGES) + '/' +id)
            .then(response => {
                dispatch(fetchPageSuccess({id:id,page:response.data}))
            })
            .catch(error => dispatch(actions.APIfailure({error: error, messageStart: 'fetchPage error'})));
    }
}

export const fetchMenus = (slug) => {
    const specificMenu = slug ? `/${slug}` : '';
    return dispatch => {
        return axios.get(APIurl.getUrl(APIurl.MENUS) + specificMenu)
            .then(response => {
                dispatch(fetchMenuSuccess(response.data))
            })
            .catch(error => dispatch(actions.APIfailure({error: error, messageStart: 'fetchMenus error'})));
    }
}

// Action Middleware

export const fetchPageSuccess = (payload) => {
    const {id,page} = payload
    return {
        type: actionTypes.GET_PAGE,
        id,
        page,
        epochtime: moment(new Date()).valueOf()
      }
}

export const fetchMenuSuccess = (menu) => {
    return {
        type: actionTypes.GET_MENU,
        menu,
        epochtime: moment(new Date()).valueOf()
      }
}