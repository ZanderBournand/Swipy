import { UPLOADS_SONGS_SET } from "../constants"
import { UPLOADS_BEATS_SET } from "../constants"

export const setUploadSongs = data => dispatch => {
    dispatch({data, type: UPLOADS_SONGS_SET})
}

export const setUploadBeats = data => dispatch => {
    dispatch({data, type: UPLOADS_BEATS_SET})
}