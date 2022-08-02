import { useQuery } from 'react-query'
import { checkConnected } from '../services/connect'
import { keys } from './queryKeys'

export const useConnected = (userId, otherUserId, otherUser, options = {}) => {
    return useQuery(keys.userConnected(userId, otherUserId), () => checkConnected(userId, otherUser), options)
}