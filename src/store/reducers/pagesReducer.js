import * as actionTypes from '../actions/actionTypes';

export const pagesReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.GET_PAGE:
            return {...state, pages: {...state.pages, [action.id]:{...action.page, epochtime: action.epochtime}}}
        case actionTypes.GET_MENU:
            return {...state, menu: {...action.menu, epochtime: action.epochtime}}
        default: return state
    }
}

export default pagesReducer