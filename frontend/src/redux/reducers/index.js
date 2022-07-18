import { combineReducers } from "redux"
import {auth} from "./auth"
import {posts} from "./posts"
import {modal} from "./modal"
import {chat} from './chat'
import {connects} from './connects'
import {uploads} from './uploads'
import {popup} from './popup'

const Reducers = combineReducers({
    auth,
    posts,
    modal,
    chat,
    connects,
    uploads,
    popup
})

export default Reducers;