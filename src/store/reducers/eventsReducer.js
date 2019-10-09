import * as actionTypes from '../actions/actionTypes';
import update from 'immutability-helper';

export const eventsReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.GET_EVENTS_ALL:
            return {...state, 
                eventsById: action.eventsById,
                epochtime: action.epochtime,
                isLoggedInData: action.isLoggedInData,
            }
        case actionTypes.SORT_EVENTS:
            return {...state,
                sortedEventsByDate: action.sortedEventsByDate,
                sortedEventsByName: action.sortedEventsByName,
                sortedEventsBySystem: action.sortedEventsBySystem,
            }
        case actionTypes.GET_SINGLE_EVENT:
            return {...state, 
                eventsById: {...state.eventsById, [action.id]: action.event}
            }
        case actionTypes.GET_EVENTS_SINCE:
            return {...state,
                eventsById: update(state.eventsById, {$merge: action.eventsById}),
                epochtime: action.epochtime,
                isLoggedInData: action.isLoggedInData,
            }
        case actionTypes.SET_EVENT_DATES:
            return {...state, 
                dates: action.dates,
            }
        case actionTypes.SET_EVENT_TIMES:
            return {...state, 
                times: action.times,
            }
        case actionTypes.SET_EVENT_CATEGORIES:
            return {...state, 
                categories: action.categories,
            }
        case actionTypes.GET_COUNTDOWN:
            return {
                ...state,
                countdown: action.countdown
            }
        default: return state
    }
}

export default eventsReducer
