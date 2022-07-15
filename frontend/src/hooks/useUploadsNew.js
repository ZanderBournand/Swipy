import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useCallback} from "react"
import { setUploads, setUploadBeats, setUploadSongs } from '../redux/actions/uploads'
import { connectsListener } from '../services/connect'
import { userSongsListener, userBeatsListener } from '../services/upload'

export const useUploadsNew = () => {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.auth.currentUser)

    const handleSongsChange = useCallback(
        (change) => {
            dispatch(setUploadSongs(change.docs.map(item => ({id: item.id, ...item.data()}))))
        },
        [dispatch],
    )

    const handleBeatsChange = useCallback(
        (change) => {
            dispatch(setUploadBeats(change.docs.map(item => ({id: item.id, ...item.data()}))))
        },
        [dispatch],
    )

    useEffect(() => { 
        let listenerInstance;
        if(currentUser != null) {
            listenerInstance = userSongsListener(handleSongsChange)
        }

        return () => {
            listenerInstance && listenerInstance()
        }
    }, [handleSongsChange, currentUser])

    useEffect(() => { 
        let listenerInstance;
        if(currentUser != null) {
            listenerInstance = userBeatsListener(handleBeatsChange)
        }

        return () => {
            listenerInstance && listenerInstance()
        }
    }, [handleSongsChange, currentUser])
}