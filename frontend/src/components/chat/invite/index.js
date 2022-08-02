import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native'
import React from 'react'
import styles from './styles'
import CachedImage from 'react-native-expo-cached-image'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import {useUser} from '../../../hooks/useUser'
import { useSelector } from 'react-redux';
import { useConnectedMutation } from '../../../hooks/useConnectedMutation';

const InvitePending = ({item, updateInvitations}) => {

  const user = useUser(item.user).data
  const navigation = useNavigation()

  const currentUser = useSelector((state) => state.auth.currentUser)
  const newConnectedMutation = useConnectedMutation()

  const acceptInvitation = () => {
    updateInvitations(item, 'accept')
    newConnectedMutation.mutate({userId: currentUser?.uid, otherUser: user?.uid, newConnectStatus: {
      connected: true,
      count: user?.connections + 1,
    }})
    newConnectedMutation.mutate({userId: currentUser?.uid, otherUser: currentUser?.uid, newConnectStatus: {
      connected: true,
      count: currentUser?.connections + 1,
    }})
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