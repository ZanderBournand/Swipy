import { combineReducers } from "redux"
import {auth} from "./auth"
import {modal} from "./modal"
import {connects} from './connects'
import {uploads} from './uploads'
import {popup} from './popup'
import {feedModal} from './feedmodal'
import {playerModal} from './playerModal'
import {playerModalPlaying}from './playerModal'

const Reducers = combineReducers({
    auth,
    modal,
    connects,
    uploads,
    popup,
    feedModal,
    playerModal,
    playerModalPlaying
})

export default Reducers;