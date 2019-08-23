import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl';  
import unixTime from 'unix-time';
import {transformArrayToObject} from '../../util/helpers'
import {authToken} from './auth'

// Async Action

const sortEvents = events => {
    return [...events].sort((a, b) => {
        if (a.eventStartDate > b.eventStartDate) {
            return 1
        } else if (a.eventStartDate === b.eventStartDate) {
            if (a.eventStartTime > b.eventStartTime) {
                return 1
            } else if (a.eventStartTime === b.eventStartTime) {
                if (a.eventName > b.eventName) {
                    return 1
                } else {return -1}
            } else {return -1}
        } else {return -1}
    }) 
}

export const fetchEvents = () => {
    return (dispatch, getState) => {
        const authHeader = authToken(getState)
        const url = authHeader ? APIurl.getUrl(APIurl.EVENTS_ALL) : APIurl.getUrl(APIurl.EVENTS_ALL_PUBLIC);
        const config = { headers: authHeader }
        return axios.get(url, config)
            .then(response => {
                const events = response.data;
                const sortedEvents = sortEvents(events);
                const eventsById = transformArrayToObject(events,'eventId');
                const listofCategories = [].concat(...events.filter((event)=> event.categories.length > 0).map((event) => event.categories))
                const uniqueCategories = [...new Set(listofCategories.map(x => x.slug)) ].map(slug => {return {slug:slug, name:listofCategories.find( x => x.slug === slug).name}})
                const uniqueDates = [...new Set(events.map(x => x.eventStartDate)) ]
                
                dispatch(fetchEventsSuccess({
                    events:sortedEvents,
                    eventsById:eventsById,
                    categories: uniqueCategories,
                    dates: uniqueDates,
                    epochtime: unixTime(new Date())
                }))
            })
            .catch(error => {
                throw(error);
            });
    }
}

const fetchEventsSuccess = ({events,eventsById,categories,dates,epochtime}) => {
    return {
        type: actionTypes.GET_EVENTS_ALL,
        events,
        eventsById,
        categories,
        dates,
        epochtime
      }
}

export const fetchEventsSince = (payload) => { // TODO: get this working
    const {epochtime} = payload
    return (dispatch, getState) => {

        return axios.get(APIurl.getUrl(APIurl.EVENTS_SINCE,{epochtime:epochtime}), authToken(getState))
            .then(response => {
                console.log(response.data)
                //const sortedEvents = sortEvents(response.data)
                //dispatch(fetchEventsSuccess(sortedEvents))
            })
            .catch(error => {
                throw(error);
            });
    }
}

export const fetchEvent = eventId => {
    return (dispatch, getState) => {
     
        const params = { id: eventId }
        return axios.post(APIurl.getUrl(APIurl.EVENTS_FIND_EVENT), params, authToken(getState))
            .then(response => {
                console.log(response.data)
                //TODO: Reconfigure now that it works!!!

                //const sortedEvents = sortEvents(response.data)
                //dispatch(fetchEventsSuccess(sortedEvents))
            })
            .catch(error => {
                throw(error);
            });
    }
}