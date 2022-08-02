import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useless2 } from '../services/connect'
import { getAllUploadsByUserId } from '../services/upload'
import { keys } from './queryKeys'

export const useUploadsMutation = (options = {}) => {

    const queryClient = useQueryClient()

    return useMutation(useless2, {
        ...options,
        onMutate: variables => {
            queryClient.setQueryData(
                keys.uploads(variables.user), variables.newUploads
            )
        },
    })

}