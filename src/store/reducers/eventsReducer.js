import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';

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
                eventsById: {...state.eventsById, [action.id]: action.event}
            }
        case actionTypes.GET_EVENTS_SINCE:
            return {...state,
                eventsById: update(state.eventsById, {$merge: action.eventsById}),
                epochtime: action.epochtime,
            }
        default: return state
    }
}

export default eventsReducer
