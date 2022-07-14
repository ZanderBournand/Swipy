import { useQuery } from 'react-query'
import { getLikeByUpload } from '../services/upload'
import { keys } from './queryKeys'

export const useLiked = (upload, user, options = {}) => {
    return useQuery(keys.liked(upload, user), () => 
    getLikeByUpload(upload, user), options)
}