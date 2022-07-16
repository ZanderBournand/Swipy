import { MODAL_OPEN_COMMENT_SECTION, CLEAR_MODAL } from "../constants"

export const openCommentModal = (open, data) => (dispatch) => {
    return dispatch({
        data,
        open,
        modalType: 0,
        type: MODAL_OPEN_COMMENT_SECTION
    })
}

export const openConnectModal = (open, data) => (dispatch) => {
    return dispatch({
        data,
        open,
        modalType: 1,
        type: MODAL_OPEN_COMMENT_SECTION
    })
}

export const clearModal = () => (dispatch) => {
    return dispatch({
        type: CLEAR_MODAL
    })
}