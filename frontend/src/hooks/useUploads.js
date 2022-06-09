import { useQuery } from 'react-query'
import { getAllUploadsByUserId } from '../services/upload'
import { keys } from './queryKeys'

export const useUploads = (userId, options = {}) => {
    return useQuery(keys.uploads(userId), () => getAllUploadsByUserId(userId), options)
}