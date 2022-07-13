import { CONNECTS_SET } from "../constants"

export const setConnects = data => dispatch => {
    dispatch({data, type: CONNECTS_SET})
}