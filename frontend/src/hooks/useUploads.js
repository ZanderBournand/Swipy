import { useQuery } from 'react-query'
import { getAllUploadsByUserId } from '../services/upload'
import { keys } from './queryKeys'
import {useDispatch, useSelector} from 'react-redux'
import firebase from 'firebase'

export const useUploads = (userId, options = {}) => {

    //const currentUserUploads = useSelector(state => state.uploads)
    const viewedUserUploads = useQuery(keys.uploads(userId), () => getAllUploadsByUserId(userId), options).data

    return viewedUserUploads

    // if (userId === firebase.auth().currentUser?.uid) {
    //     return currentUserUploads
    // }
    // else {
    //     return viewedUserUploads
    // }

}