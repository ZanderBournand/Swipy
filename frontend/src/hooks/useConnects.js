import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useCallback} from "react"
import { setConnects } from '../redux/actions/connects'
import { connectsListener } from '../services/connect'

export const useConnects = () => {

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.auth.currentUser)

    const handleConnectsChange = useCallback(
        (change) => {
            dispatch(setConnects(change.docs.map(item => ({id: item.id, ...item.data()}))))
        },
        [dispatch],
    )

    useEffect(() => { 
        let listenerInstance;
        if(currentUser != null) {
            listenerInstance = connectsListener(handleConnectsChange)
        }

        return () => {
            listenerInstance && listenerInstance()
        }
    }, [handleConnectsChange, currentUser])
}