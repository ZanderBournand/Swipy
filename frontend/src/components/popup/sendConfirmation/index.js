import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {clearPopup, openPopup2, openPopup3} from '../../../redux/actions/popup'
import { sendConnectRequest } from '../../../services/connect'
import { useConnectedMutation } from '../../../hooks/useConnectedMutation'

const SendConfirmation = ({track}) => {

  const currentUser = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch();

  const newConnectedMutation = useConnectedMutation()

  const sendInvitation = () => {
    if (currentUser != null && track != null) {
        sendConnectRequest(currentUser?.uid, track?.creator, track).then((res) => {
          if (res === 'sent') {
            setTimeout(() => {
              dispatch(openPopup2(track))
            }, 200)
          }
          else if (res === 'complete') {
            newConnectedMutation.mutate({userId: currentUser?.uid, otherUserId: track?.creator, isConnected: false})
            setTimeout(() => {
                dispatch(openPopup3(track))
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
            <Text style={styles.descriptionText}>The following will send a Connect Invitation to the {track?.type == 'song' ? "artist" : "producer"} of the track you interacted with</Text>
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