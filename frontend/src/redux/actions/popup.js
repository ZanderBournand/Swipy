import { POPUP_1_OPEN, POPUP_2_OPEN, POPUP_3_OPEN, CLEAR_POPUP } from "../constants"

export const openPopup1 = (data) => (dispatch) => {
    return dispatch({
        data,
        open: true,
        popupType: 1,
        type: POPUP_1_OPEN,
    })
}

export const openPopup2 = (data) => (dispatch) => {
    return dispatch({
        data,
        open: true,
        popupType: 2,
        type: POPUP_2_OPEN,
    })
}

export const openPopup3 = (data) => (dispatch) => {
    return dispatch({
        data,
        open: true,
        popupType: 3,
        type: POPUP_3_OPEN,
    })
}

export const clearPopup = () => (dispatch) => {
    return dispatch({
        type: CLEAR_POPUP
    })
}