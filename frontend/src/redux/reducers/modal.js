import {MODAL_OPEN_COMMENT_SECTION, CLEAR_MODAL, CLOSE_MODAL} from '../constants'

const initialState = {
    open: false,
    data: null,
    modalType: -1,
}

export const modal = (state = initialState, action) => {
    switch(action.type){
        case MODAL_OPEN_COMMENT_SECTION:
            return{
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
            }
        case CLEAR_MODAL:
            return initialState
        default:
            return state;
    }
}