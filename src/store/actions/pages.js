import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl';
import moment from 'moment'
import * as actions from '../../store/actions';

// Async Action

export const fetchPage = (id) => {
    const url = APIurl.getUrl(APIurl.PAGES) + '/' +id
    return dispatch => {
        if (window.cordova) { 
            window.cordova.plugin.http.get(url, {}, {}, function(response) {
                dispatch(fetchPageSuccess({id:id,page:response.data}))
                }, function(response) {
                console.error('cordova error: ', response.error);
                dispatch(actions.APIfailure({error: response.error, messageStart: 'fetchPage cordova error'}))
            });
            
        } else {
            return axios.get(url)
            .then(response => {
                dispatch(fetchPageSuccess({id:id,page:response.data}))
            })
            .catch(error => dispatch(actions.APIfailure({error: error, messageStart: 'fetchPage error'})));
        }
        
    }
}

export const fetchMenus = (slug) => {
    const specificMenu = slug ? `/${slug}` : '';
    const url = APIurl.getUrl(APIurl.MENUS) + specificMenu
    return dispatch => {
        if (window.cordova) {
            return window.cordova.plugin.http.get(url, {}, {}, function(response) {
                dispatch(fetchMenuSuccess(response.data))
                }, function(response) {
                console.error('cordova error: ', response.error);
                dispatch(actions.APIfailure({error: response.error, messageStart: 'fetchMenus cordova error'}))
            });
        } else {
            return axios.get(url)
                .then(response => {
                    dispatch(fetchMenuSuccess(response.data))
                })
                .catch(error => dispatch(actions.APIfailure({error: error, messageStart: 'fetchMenus error'})));
        }
        
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