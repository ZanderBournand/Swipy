import { View, Text, Image } from 'react-native'
import React, {useEffect} from 'react'
import styles from './styles'
import generalStyles from '../../../../styles/generalStyles'
import {useUser} from '../../../../hooks/useUser'
import firebase from 'firebase'

const ChatSingleItem = ({item}) => {

  const {data: userData, isLoading} = useUser(item.creator)

  if(isLoading) {
    return <></>
  }

  const isCurrentUser = item.creator === firebase.auth().currentUser.uid

  return (
    <View style={isCurrentUser ? styles.containerCurrent : styles.containerOther}>
      <Image style={generalStyles.avatarSmall} source={{uri: userData?.photoURL}}/>

      <View style={isCurrentUser ? styles.containerTextCurrent : styles.containerOther}>
        <Text style={styles.text}>{item.message}</Text>
      </View>

    </View>
  )
}

export default ChatSingleItem