import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl';  
import unixTime from 'unix-time';
import {transformArrayToObject, transformArrayToSimpleObject, dynamicSortMultiple} from '../../util/helpers'
import {authToken} from './auth';
import * as actions from '../../store/actions';

// Async Action

const sortEvents = events => {
    return [...events].sort(dynamicSortMultiple('eventStartDate','eventStartTime','eventName'))
}

export const fetchEventsCount = () => {
    return (dispatch, getState) => {
        const authHeader = authToken(getState)
        const url = authHeader ? APIurl.getUrl(APIurl.EVENTS_COUNT) : APIurl.getUrl(APIurl.EVENTS_COUNT);
        const config = { headers: authHeader }
        return axios.get(url, config)
            .then(response => {
                const eventsCount = response.data;
                console.log(eventsCount)
                
            })
            .catch(error => {
                if (error.message.match(/403/g)) { dispatch(actions.logout()) }
                throw(error);
            });
    }
}

export const fetchEvents = () => {
    return (dispatch, getState) => {
        const authHeader = authToken(getState)
        const url = authHeader ? APIurl.getUrl(APIurl.EVENTS_ALL) : APIurl.getUrl(APIurl.EVENTS_ALL_PUBLIC);
        const config = { headers: authHeader }
        return axios.get(url, config)
            .then(response => {
                const events = response.data;
                const eventsConvertMetadata = events.map(data => { return {...data, metadata: transformArrayToSimpleObject(data.metadata,'metaKey','metaValue')} })
                const activeEvents = eventsConvertMetadata.filter(event => event.eventStatus === 1);
                const sortedEventsArray = sortEvents(activeEvents).map(event => event.eventId);
                const eventsById = transformArrayToObject(activeEvents,'eventId');
                const listofCategories = [].concat(...activeEvents.filter((event)=> event.categories.length > 0).map((event) => event.categories))
                const uniqueCategories = [...new Set(listofCategories.map(x => x.slug)) ].map(slug => {return {slug:slug, name:listofCategories.find( x => x.slug === slug).name}})
                const uniqueDates = [...new Set(activeEvents.map(x => x.eventStartDate)) ].sort()
                
                dispatch(fetchEventsSuccess({
                    sortedEventsArray: sortedEventsArray,
                    eventsById: eventsById,
                    categories: uniqueCategories,
                    dates: uniqueDates,
                    epochtime: unixTime(new Date())
                }))
            })
            .catch(error => {
                if (error.message.match(/403/g)) { dispatch(actions.logout()) }
                throw(error);
            });
    }
}

const fetchEventsSuccess = ({duplicateEvents,events,sortedEventsArray,eventsById,categories,dates,epochtime}) => {
    return {
        type: actionTypes.GET_EVENTS_ALL,
        duplicateEvents,
        events,
        sortedEventsArray,
        eventsById,
        categories,
        dates,
        epochtime
      }
}

export const fetchEventsSince = (payload) => { // TODO: get this working with public too
    const {epochtime} = payload
    return (dispatch, getState) => {
        const authHeader = authToken(getState)
        const config = { headers: authHeader }
        const url = authHeader ? APIurl.getUrl(APIurl.EVENTS_SINCE,{epochtime:epochtime}) : APIurl.getUrl(APIurl.EVENTS_SINCE_PUBLIC,{epochtime:epochtime});
        return axios.get(url, config)
            .then(response => {
                const eventsConvertMetadata = response.data.map(data => { return {...data, metadata: transformArrayToSimpleObject(data.metadata,'metaKey','metaValue')} })
                const eventsById = transformArrayToObject(eventsConvertMetadata,'eventId');
                dispatch(fetchEventsSinceSuccess({eventsById:eventsById,epochtime:unixTime(new Date())}))
                //TODO: right now this is jsut grabbing data and merging with eventsById. Will need to test to see if title/date/time changed and if so resort the sortedArray
            })
            .catch(error => {
                throw(error);
            });
    }
}

const fetchEventsSinceSuccess = ({eventsById,epochtime}) => {
    return {
        type: actionTypes.GET_EVENTS_SINCE,
        eventsById,
        epochtime
      }
}

export const fetchEvent = eventId => {
    return (dispatch, getState) => {
        const config = { headers: authToken(getState) }
        const params = { id: eventId }
        return axios.post(APIurl.getUrl(APIurl.EVENTS_FIND_EVENT), params, config)
            .then(response => {
                const eventsConvertMetadata = {...response.data, metadata: transformArrayToSimpleObject(response.data.metadata,'metaKey','metaValue')}
                dispatch(fetchEventSuccess(eventsConvertMetadata))
            })
            .catch(error => {
                if (error.message.match(/403/g)) { dispatch(actions.logout()) }
                throw(error);
            });
    }
}

const fetchEventSuccess = (event) => {
    return {
        type: actionTypes.GET_SINGLE_EVENT,
        id: event.eventId,
        event
    }
}