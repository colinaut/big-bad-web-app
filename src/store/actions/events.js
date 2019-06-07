import axios from 'axios'
import * as actionTypes from './actionTypes';

// Async Action

const allEventsUrl = 'https://www.bigbadcon.com:8091/api/events/all'

export const fetchEvents = () => {
    return (dispatch, getState) => {
        const state = getState();
        const authData = {headers: {Authorization: state.token}}
        return axios.get(allEventsUrl, authData)
            .then(response => {
                // Dispatch another action
                // to consume data
                console.log(response.data);
                dispatch(fetchEventsSuccess(response.data))
            })
            .catch(error => {
                throw(error);
            });
    }
}

// Action Middleware

export const fetchEventsSuccess = (events) => {
    return {
        type: actionTypes.EVENTS,
        events
      }
}