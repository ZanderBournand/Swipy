import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native'
import React from 'react'
import styles from './styles'
import CachedImage from 'react-native-expo-cached-image'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import {useUser} from '../../../hooks/useUser'

const InvitePending = ({item, updateInvitations}) => {

  const user = useUser(item.user).data
  const navigation = useNavigation()

  const acceptInvitation = () => {
    updateInvitations(item, 'accept')
    LayoutAnimation.configureNext(layoutAnimConfig)
  }

  const declineInvitation = () => {
    updateInvitations(item, 'decline')
    LayoutAnimation.configureNext(layoutAnimConfig)
  }

  const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut, 
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('profileOther', {initialUserId: user?.uid, searched: true})}> 
        <CachedImage style={styles.profileImage} source={{uri: user?.photoURL}}/>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('profileOther', {initialUserId: user?.uid, searched: true})}>
            <Text style={styles.username}>{user?.displayName}</Text>
        </TouchableOpacity>
        <Text style={styles.trackInfo}>Track: {item?.track.title}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.declineButton} onPress={() => {declineInvitation()}}>
            <Feather name="x" size={26} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={() => {acceptInvitation()}}>
            <Feather name="check" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default InvitePending