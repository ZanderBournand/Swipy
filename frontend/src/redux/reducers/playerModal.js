import {PLAYER_MODAL_OPEN, CLEAR_PLAYER_MODAL, PLAYER_MODAL_PLAYING} from "../constants"

const initialState = {
    open: false,
    data: {
        user: null,
        list: null,
        index: null,
        track: null
    },
}

const initialState2 = {
    playing: false
}

export const playerModal = (state = initialState, action) => {
    switch(action.type) {
        case PLAYER_MODAL_OPEN:
            return {
                ...state,
                open: action.open,
                data: action.data,
            }
        case CLEAR_PLAYER_MODAL:
            return initialState
        default:
            return state
    }
}

export const playerModalPlaying = (state = initialState2, action) => {
    switch(action.type) {
        case PLAYER_MODAL_PLAYING:
            return {
                ...state,
                playing: action.playing,
            }
        default:
            return state
    }
}