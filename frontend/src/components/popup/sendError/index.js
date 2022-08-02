import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {clearPopup, openPopup2, openPopup3} from '../../../redux/actions/popup'

const SendError = ({data}) => {

  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.titleContainer2}>
          <Text style={styles.titleText}>ERROR</Text>
          <View style={styles.subheaderContainer2}>
            <Text style={styles.descriptionText}>You have already sent a connect request to the {data?.track?.id != 'n/a' ? data?.track?.type == 'song' ? "artist" : "producer" : 'user'} of this track. Please wait until they answer your invitation before sending another request.</Text>
          </View>
          <View style={styles.buttonsContainer2}>
            <TouchableOpacity onPress={() => {dispatch(clearPopup())}}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
    </>
  )
}

export default SendError