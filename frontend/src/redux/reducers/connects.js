import { CONNECTS_SET } from '../constants'

const initialState = {
    list: [],
}

export const connects = (state = initialState, action) => {
    switch(action.type){
        case CONNECTS_SET:
            return {
                ...state,
                list: action.data
            }
        default:
            return state;
    }
}