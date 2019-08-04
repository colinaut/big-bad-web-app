import * as actionTypes from '../actions/actionTypes';

export const blogReducer = (state = {}, action) => {

    switch (action.type) {
        case actionTypes.GET_BLOG:
            return {...state, blog: action.blog}
        default: return state
    }
}

export default blogReducer
