import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {clearPopup, openPopup2, openPopup3} from '../../../redux/actions/popup'
import { useNavigation } from '@react-navigation/native'

const NewConnect = ({track}) => {

  const dispatch = useDispatch();
  const navigation = useNavigation()

  return (
    <>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>You Matched!</Text>
        </View>
        <View style={styles.subheaderContainer}>
            <Text style={styles.descriptionText}>You just matched with your desired {track?.id != 'n/a' ? track?.type == 'song' ? "artist" : "producer" : 'user'}. Feel free to start you conversation by sending the first message!</Text>
        </View>
        <View style={styles.buttonsContainer3}>
            <TouchableOpacity style={styles.buttonMessages} onPress={() => {
                dispatch(clearPopup())
                navigation.navigate('Inbox')
            }}>
                <Text style={styles.buttonConfirmText}>GO TO MESSAGES</Text>
            </TouchableOpacity>
        </View>
    </>
  )
}

export default NewConnect