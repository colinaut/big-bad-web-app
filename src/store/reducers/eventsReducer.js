import * as actionTypes from '../actions/actionTypes';

export const eventsReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.GET_EVENTS_ALL:
            return {...state, 
                sortedEventsArray: action.sortedEventsArray,
                eventsById: action.eventsById,
                categories: action.categories,
                dates: action.dates,
                epochtime: action.epochtime,
            }
        case actionTypes.GET_SINGLE_EVENT:
            return {...state, 
                eventsById: {...state.eventsById, [action.id]: action.event},
                events: state.events.map(event => {
                    if (event.eventId === action.id) { return action.event }
                    return event;
                })
            }
        default: return state
    }
}

export default eventsReducer
