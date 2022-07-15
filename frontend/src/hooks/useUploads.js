import { useQuery } from 'react-query'
import { getAllUploadsByUserId } from '../services/upload'
import { keys } from './queryKeys'
import {useDispatch, useSelector} from 'react-redux'
import firebase from 'firebase'

export const useUploads = (userId, options = {}) => {

    if (userId === firebase.auth().currentUser?.uid) {
        return useSelector(state => state.uploads)
    }
    else {
        return useQuery(keys.uploads(userId), () => getAllUploadsByUserId(userId), options).data
    }

}