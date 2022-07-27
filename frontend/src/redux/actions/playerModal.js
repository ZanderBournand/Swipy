import {PLAYER_MODAL_OPEN, CLEAR_PLAYER_MODAL, PLAYER_MODAL_PLAYING} from "../constants"

export const openPlayerModal = (data) => (dispatch) => {
    return dispatch({
        data,
        open : true,
        type: PLAYER_MODAL_OPEN
    })
}

export const clearPlayerModal = () => (dispatch) => {
    return dispatch({
        type: CLEAR_PLAYER_MODAL
    })
}

export const changePlayingStatus = (playing) => (dispatch) => {
    return dispatch({
        playing,
        type: PLAYER_MODAL_PLAYING
    })
}