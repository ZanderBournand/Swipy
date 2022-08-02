import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {clearPopup, openPopup2, openPopup3} from '../../../redux/actions/popup'
import { sendConnectRequest } from '../../../services/connect'
import { useConnectedMutation } from '../../../hooks/useConnectedMutation'
import { useUser } from '../../../hooks/useUser'

const SendConfirmation = ({data}) => {

  const currentUser = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch();

  const newConnectedMutation = useConnectedMutation()

  const sendInvitation = () => {
    if (currentUser != null && data?.track != null) {
        sendConnectRequest(currentUser?.uid, data?.user.uid, data?.track).then((res) => {
          if (res === 'sent') {
            setTimeout(() => {
              dispatch(openPopup2(data))
            }, 200)
          }
          else if (res === 'complete') {
            newConnectedMutation.mutate({userId: currentUser?.uid, otherUser: data?.user.uid, newConnectStatus: {
              connected: true,
              count: data?.user?.connections + 1,
            }})
            newConnectedMutation.mutate({userId: currentUser?.uid, otherUser: currentUser?.uid, newConnectStatus: {
              connected: true,
              count: currentUser?.connections + 1,
            }})
            setTimeout(() => {
              dispatch(openPopup3(data))
            }, 200)
          }
        })
      }
  }

  return (
    <>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Request Confirmation</Text>
        </View>
        <View style={styles.subheaderContainer}>
            <Text style={styles.descriptionText}>The following will send a Connect Invitation to the {data?.track?.type == 'song' ? "artist" : "producer"} of the track you interacted with</Text>
        </View>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttonCancel} onPress={() => {dispatch(clearPopup())}}>
                <Text style={styles.buttonCancelText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonConfirm} onPress={() => {
                sendInvitation()
                dispatch(clearPopup())
            }}>
                <Text style={styles.buttonConfirmText}>CONFIRM</Text>
            </TouchableOpacity>
        </View>
    </>
  )
}

export default SendConfirmation