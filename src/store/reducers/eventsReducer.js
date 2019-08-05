import * as actionTypes from '../actions/actionTypes';

export const eventsReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.GET_EVENTS_ALL:
            return {...state, 
                events: action.events, 
                eventsById: action.eventsById, 
                categories: action.categories,
                dates: action.dates,
                epochtime: action.epochtime,
            }
        default: return state
    }
}

export default eventsReducer
