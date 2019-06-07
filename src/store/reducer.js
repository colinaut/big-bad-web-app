import {BLOG} from './actions'

const initialState = {
    blog: [] 
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case BLOG:
            return {...state, blog: action.blog}
    }
    return state;
}

export default reducer