import * as actionTypes from '../actions/actionTypes';

export const bookingReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.GET_MY_EVENTS:
            return {...state, myEvents: action.myEvents}
        case actionTypes.ADD_FAV_EVENT:
            return {...state, favEvents: [...state.favEvents, action.eventId]}
        case actionTypes.REMOVE_FAV_EVENT:
            return {...state, favEvents: state.favEvents.filter(item => action.eventId !== item)} 
        case actionTypes.BOOK_ME_INTO_GAME:
            return {...state, myEvents:[...state.myEvents, action.eventId]}
        case actionTypes.GET_MY_AVAILABLE_GAME_SLOTS:
            return {...state, myAvailableGameSlots: action.myAvailableGameSlots}
        case actionTypes.GET_MY_FAV_EVENTS:
            return {...state, favEvents:action.favEvents}
        default: return state
    }
}

export default bookingReducer
