import { UPLOADS_SONGS_SET } from '../constants'
import { UPLOADS_BEATS_SET } from '../constants'

const initialState = {
    songs: {},
    beats: {}
}

export const uploads = (state = initialState, action) => {
    switch(action.type){
        case UPLOADS_SONGS_SET:
            return {
                ...state,
                songs: action.data,
            }
        case UPLOADS_BEATS_SET:
            return {
                ...state,
                beats: action.data,
            }
        default:
            return state;
    }
}