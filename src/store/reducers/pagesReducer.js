import * as actionTypes from '../actions/actionTypes';

export const pagesReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.GET_PAGE:
            return {...state, pages: {...state.pages, [action.page.id]:action.page}}
        default: return state
    }
}

export default pagesReducer