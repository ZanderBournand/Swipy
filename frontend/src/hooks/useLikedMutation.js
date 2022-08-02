import { useMutation, useQuery, useQueryClient } from 'react-query'
import { changeFollowState, getIsFollowing } from '../services/user'
import { keys } from './queryKeys'
import firebase from 'firebase'
import { changeLikeState, updateLike } from '../services/upload'

export const useLikedMutation = (options = {}) => {

    const queryClient = useQueryClient()

    return useMutation(changeLikeState, {
        ...options,
        onMutate: variables => {
            queryClient.setQueryData(
                keys.liked(variables.upload, variables.user), variables.newLikeStatus
            )
        }
    })

}