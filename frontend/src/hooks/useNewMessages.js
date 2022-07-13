import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useCallback, useState} from "react"
import { createConnection, generateID, messagesListener } from '../services/connect'

export const useNewMessages = (connectId, contactId) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.auth.currentUser)

    const connects = useSelector(state => state.connects.list);
    const [connectIdInst, setConnectIdInst] = useState(connectId)

    const [messages, setMessages] = useState([])

    const handleMessagesChange = useCallback(
        (change) => {
            setMessages(change.docs.map(item => ({id: item.id, ...item.data()})))
        },
        [dispatch],
    )

    useEffect(() => { 
        let listenerInstance;
        if(!connectIdInst) {
            let connect = connects.find(item => item.members.some(member => member === contactId))
            if(!connect) {
                createConnection(currentUser.uid, contactId)
                setConnectIdInst(generateID(currentUser.uid, contactId))
            }
            else {
                setConnectIdInst(connect.id)
            }
        }
        if(currentUser != null && connectIdInst) {
            listenerInstance = messagesListener(handleMessagesChange, connectIdInst)
        }

        return () => {
            listenerInstance && listenerInstance()
        }
    }, [handleMessagesChange, currentUser, connectIdInst])

    return { messages, connectIdInst }
}