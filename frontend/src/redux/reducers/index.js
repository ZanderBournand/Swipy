import { combineReducers } from "redux"
import {auth} from "./auth"
import {posts} from "./posts"
import {modal} from "./modal"
import {chat} from './chat'
import {connects} from './connects'

const Reducers = combineReducers({
    auth,
    posts,
    modal,
    chat,
    connects
})

export default Reducers;