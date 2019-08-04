import * as actionTypes from '../actions/actionTypes';

export const eventsReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.GET_EVENTS_ALL_PUBLIC:
            return {...state, events: action.events, epochtimePublic: action.epochtime}
        case actionTypes.GET_EVENTS_ALL:
            return {...state, events: action.events, epochtimeAuth: action.epochtime}
        case actionTypes.FAV_EVENT_LOCAL_STORAGE:
            return {...state, favEvents: action.favs}
        case actionTypes.ADD_FAV_EVENT:
            console.log(state)
            return {...state, favEvents: [...state.favEvents, action.eventId]}
        case actionTypes.REMOVE_FAV_EVENT:
            return {...state, favEvents: state.favEvents.filter(item => action.eventId !== item)} 
        default: return state
    }
}

export default eventsReducer
