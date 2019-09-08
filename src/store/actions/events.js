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
        eventOwner: data.eventOwner ? {id: data.eventOwner.id, displayName: data.eventOwner.displayName} : null, 
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
                const eventsSimplified = simplifyEvents(response.data);
                const activeEvents = eventsSimplified.filter(event => event.eventStatus === 1);
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

export const fetchEvent = eventId => {
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