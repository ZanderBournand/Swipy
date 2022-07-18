import { POPUP_1_OPEN, POPUP_2_OPEN, POPUP_3_OPEN, CLEAR_POPUP } from "../constants"

const initialState = {
    open: false,
    data: null,
    popupType: -1,
}

export const popup = (state = initialState, action) => {
    switch (action.type) {
        case POPUP_1_OPEN, POPUP_2_OPEN, POPUP_3_OPEN:
            return {
                ...state,
                open: action.open,
                data: action.data,
                popupType: action.popupType
            }
        case CLEAR_POPUP:
            return initialState
        default:
            return state
    }
}