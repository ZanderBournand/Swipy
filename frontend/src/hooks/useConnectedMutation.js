import { useMutation, useQuery, useQueryClient } from 'react-query'
import { changeFollowState, getIsFollowing } from '../services/user'
import { keys } from './queryKeys'
import firebase from 'firebase'
import { changeLikeState, updateLike } from '../services/upload'
import { useless } from '../services/connect'

export const useConnectedMutation = (options = {}) => {

    const queryClient = useQueryClient()

    return useMutation(useless, {
        ...options,
        onMutate: variables => {
            queryClient.setQueryData(
                keys.userConnected(variables.userId, variables.otherUserId), !variables.isConnected
            )
        }
    })

}