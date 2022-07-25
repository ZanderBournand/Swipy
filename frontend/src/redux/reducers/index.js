import { combineReducers } from "redux"
import {auth} from "./auth"
import {modal} from "./modal"
import {connects} from './connects'
import {uploads} from './uploads'
import {popup} from './popup'
import {feedModal} from './feedmodal'

const Reducers = combineReducers({
    auth,
    modal,
    connects,
    uploads,
    popup,
    feedModal
})

export default Reducers;