import {FEED_MODAL_OPEN, CLEAR_FEED_MODAL} from "../constants"

const initialState = {
    open: false,
    data: null,
    modalType: -1,
}

export const feedModal = (state = initialState, action) => {
    switch(action.type) {
        case FEED_MODAL_OPEN:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
            }
        case CLEAR_FEED_MODAL:
            return initialState
        default:
            return state
    }
}