import {FEED_MODAL_OPEN, CLEAR_FEED_MODAL} from "../constants"

export const openPopularFeedModal = (data) => (dispatch) => {
    return dispatch({
        data,
        open : true,
        modalType: 1,
        type: FEED_MODAL_OPEN
    })
}

export const openPreviewFeedModal = (data) => (dispatch) => {
    return dispatch({
        data,
        open : true,
        modalType: 2,
        type: FEED_MODAL_OPEN
    })
}

export const openAllFeedModal = (data) => (dispatch) => {
    return dispatch({
        data,
        open : true,
        modalType: 3,
        type: FEED_MODAL_OPEN
    })
}

export const clearModal = () => (dispatch) => {
    return dispatch({
        type: CLEAR_FEED_MODAL
    })
}