import { useQuery } from 'react-query'
import {getPostsByUserId} from '../services/posts'
import { keys } from './queryKeys'

export const usePosts = (userId, options = {}) => {
    return useQuery(keys.posts(userId), () => getPostsByUserId(userId), options)
}