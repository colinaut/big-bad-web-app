import * as actionTypes from '../actions/actionTypes';

export const eventsReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.GET_EVENTS_ALL_PUBLIC:
            return {...state, events: action.events, sortedEvents: action.sortedEvents, epochtimePublic: action.epochtime}
        case actionTypes.GET_EVENTS_ALL:
            return {...state, events: action.events, sortedEvents: action.sortedEvents, epochtimeAuth: action.epochtime}
        case actionTypes.ADD_FAV_EVENT:
            return {...state, favEvents: [...state.favEvents, action.eventId]}
        case actionTypes.REMOVE_FAV_EVENT:
            return {...state, favEvents: state.favEvents.filter(item => action.eventId !== item)} 
        case actionTypes.DEFINE_CATEGORIES:
            return {...state, categories: action.categories} 
        case actionTypes.DEFINE_DATES:
            return {...state, dates: action.dates} 
        default: return state
    }
}

export default eventsReducer
