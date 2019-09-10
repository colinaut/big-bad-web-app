import axios from 'axios'
import * as actionTypes from './actionTypes';
import * as APIurl from '../../util/APIurl';  
import unixTime from 'unix-time';
import {transformArrayToObject, transformArrayToSimpleObject, dynamicSortMultiple} from '../../util/helpers'
import {authToken} from './auth';
import * as actions from '../../store/actions';

// Async Action

const simplifyEvents = events => {
    return events.map(data => { return {
        //...data,
        //blogId: data.blogId
        bookingExempt: data.bookingExempt || null,
        bookings: data.bookings ? data.bookings.filter(booking => booking.bookingStatus === 1).map(booking => {return {bookingComment: booking.bookingComment, id: booking.user.id, displayName: booking.user.displayName}}) : null,
        categories: data.categories.map(category => {return { slug:category.slug, name: category.name}}), 
        //eventAllDay: data.eventAllDay
        //eventAttributes: data.eventAttributes
        //eventCategoryId: data.eventCategoryId
        //eventDateCreated: data.eventDateCreated
        //eventDateModified: data.eventDateModified
        eventStartTime: data.eventStartTime,
        eventEndTime: data.eventEndTime,
        eventStartDate: data.eventStartDate,
        //eventEndDate: data.eventEndDate,
        eventId: data.eventId,
        eventName: data.eventName,
        eventSystem: data.metadata.find(meta => meta.metaKey === 'System') ? data.metadata.find(meta => meta.metaKey === 'System').metaValue : null,
        //eventOwner: data.eventOwner ? {id: data.eventOwner.id, displayName: data.eventOwner.displayName} : null, 
        eventPrivate: data.eventPrivate || null,
        //eventRoom: data.eventRoom || null,
        //eventRsvp: data.eventRsvp
        //eventRsvpDate: data.eventRsvpDate
        //eventRsvpSpaces: data.eventRsvpSpaces
        //eventRsvpTime: data.eventRsvpTime
        //eventSlug: data.eventSlug
        //eventSpaces: data.eventSpaces
        eventStatus: data.eventStatus || null,
        //eventTable: data.eventTable
        //groupId: data.groupId
        //lastUpdated: data.lastUpdated
        //locationId: data.locationId
        metadata: transformArrayToSimpleObject(data.metadata,'metaKey','metaValue'),
        postContent: data.postContent,
    } })
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
                const activeEvents = simplifyEvents(response.data).filter(event => event.eventStatus === 1);
            
                dispatch(fetchEventsSuccess({
                    eventsById: transformArrayToObject(activeEvents,'eventId'),
                    epochtime: unixTime(new Date())
                }))
                dispatch(sortEvents(activeEvents))
                dispatch(setEventDates(activeEvents))
                dispatch(setEventTimes(activeEvents))
                dispatch(setEventCategories(activeEvents))
                dispatch(fetchCountdown());
            })
            .catch(error => {
                if (error.message.match(/403/g)) { dispatch(actions.logout()) }
                throw(error);
            });
    }
}

const fetchEventsSuccess = ({eventsById,categories,dates,epochtime}) => {
    return {
        type: actionTypes.GET_EVENTS_ALL,
        eventsById,
        categories,
        dates,
        epochtime
      }
}

const setEventDates = events => {
    return dispatch => {
        const dates = [...new Set(events.map(x => x.eventStartDate)) ].sort()
        dispatch({
            type: actionTypes.SET_EVENT_DATES,
            dates
        })
    }
}

const setEventTimes = events => {
    return dispatch => {
        const times = [...new Set(events.map(x => x.eventStartTime)) ].sort()
        dispatch({
            type: actionTypes.SET_EVENT_TIMES,
            times
        })
    }
}

const setEventCategories = events => {
    return dispatch => {
        const listofCategories = [].concat(...events.filter((event)=> event.categories.length > 0).map((event) => event.categories))
        const categories = [...new Set(listofCategories.map(x => x.slug)) ].map(slug => {return {slug:slug, name:listofCategories.find( x => x.slug === slug).name}})
                
        dispatch({
            type: actionTypes.SET_EVENT_CATEGORIES,
            categories
        })
    }
}

export const sortEvents = events => {
    return dispatch => {
        dispatch(sortEventsSuccess({
            sortedEventsByDate: [...events].sort(dynamicSortMultiple('eventStartDate','eventStartTime','eventName')).map(event => event.eventId),
            sortedEventsByName: [...events].sort(dynamicSortMultiple('eventName','eventStartDate','eventStartTime')).map(event => event.eventId),
            sortedEventsBySystem: [...events].sort(dynamicSortMultiple('eventSystem','eventStartDate','eventStartTime')).map(event => event.eventId),
        }))
    }
}

const sortEventsSuccess = ({sortedEventsByDate,sortedEventsByName,sortedEventsBySystem}) => {
    return {
        type: actionTypes.SORT_EVENTS,
        sortedEventsByDate,
        sortedEventsByName,
        sortedEventsBySystem
    }
}

export const fetchEventsSince = (payload) => { // TODO: get this working with public too; //TODO add sort function if date/time/name/system changes
    const {epochtime} = payload
    return (dispatch, getState) => {
        const authHeader = authToken(getState)
        const config = { headers: authHeader }
        const url = authHeader ? APIurl.getUrl(APIurl.EVENTS_SINCE,{epochtime:epochtime}) : APIurl.getUrl(APIurl.EVENTS_SINCE_PUBLIC,{epochtime:epochtime});
        return axios.get(url, config)
            .then(response => {
                const eventsSimplified = simplifyEvents(response.data);
                const activeEvents = eventsSimplified.filter(event => event.eventStatus === 1);
                const eventsById = transformArrayToObject(activeEvents,'eventId');
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

export const fetchEvent = eventId => { //TODO add sort function if date/time/name/system changes
    return (dispatch, getState) => {
        const config = { headers: authToken(getState) }
        const params = { id: eventId }
        return axios.post(APIurl.getUrl(APIurl.EVENTS_FIND_EVENT), params, config)
            .then(response => {
                const simplifiedEvent = simplifyEvents([response.data])[0]
                dispatch(fetchEventSuccess(simplifiedEvent))
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

export const fetchCountdown = () => {
    return dispatch => {
        return axios.get(APIurl.getUrl(APIurl.COUNTDOWN))
            .then(response => {
                
                const countdown = JSON.parse(response.data.files['bbcCountdown.json'].content)
                dispatch(fetchCountdownSuccess(countdown))
            })
            .catch(error => {
                if (error.message.match(/403/g)) { dispatch(actions.logout()) }
                throw(error);
            });

    }
}

const fetchCountdownSuccess = (countdown) => {
    return {
        type: actionTypes.GET_COUNTDOWN,
        countdown
    }
}
