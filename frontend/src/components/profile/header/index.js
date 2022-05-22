import React, {useState} from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Avatar } from 'react-native-paper'
import { buttonStyles } from '../../../styles'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import firebase from 'firebase'
import {Feather} from '@expo/vector-icons'
import { useFollowing } from '../../../hooks/useFollowing'
import { useFollowingMutation } from '../../../hooks/useFollowingMutation'

export default function ProfileHeader({ user }) {
  
  let [imageLoading, setImageLoading] = useState(false)

  const navigation = useNavigation();

  const isFollowing = useFollowing(firebase.auth().currentUser.uid, user?.uid).data
  const isFollowingMutation = useFollowingMutation()

  const renderFollownButton = () => {

    if(isFollowing) {
      return (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={buttonStyles.grayOutlinedButton} onPress={() => navigation.navigate('chatSingle', {contactId: user.uid})}>
            <Text style={buttonStyles.grayOutlinedButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyles.grayOutlinedIconButton} onPress={() => isFollowingMutation.mutate({otherUserId: user.uid, isFollowing})}>
            <Feather name='user-check' size={20}/>
          </TouchableOpacity>
        </View>
      )
    }
    else {
      return (
        <TouchableOpacity style={buttonStyles.filledButton} onPress={() => isFollowingMutation.mutate({otherUserId: user.uid, isFollowing})}>
          <Text style={buttonStyles.filledButtonText}>Follow</Text>
        </TouchableOpacity>
      )
    }
  }

  return (
    <View style={styles.container}>
      {true ?
        <View>
          <Image style={styles.userImage} source={{ uri: user?.photoURL}} onLoadStart={() => {setImageLoading(true)}} onLoadEnd={() => {setImageLoading(false)}}/>
          {imageLoading ?
            <ActivityIndicator style={styles.loader} size="small" color="white" />
            :
            <></>
          }
        </View>
        :
        <Avatar.Icon size={80} icon={"account"}/>
      }
      <Text style={styles.emailText}>{user?.email}</Text>
      <View style={styles.counterContainer}>
          <View style={styles.counterItemContainer}>
              <Text style={styles.counterNumberText}>0</Text>
              <Text style={styles.counterLabelText}>Following</Text>
          </View>

          <View style={styles.counterItemContainer}>
              <Text style={styles.counterNumberText}>0</Text>
              <Text style={styles.counterLabelText}>Followers</Text>
          </View>

          <View style={styles.counterItemContainer}>
              <Text style={styles.counterNumberText}>0</Text>
              <Text style={styles.counterLabelText}>Likes</Text>
          </View>
      </View>
      
      {user?.uid === firebase.auth().currentUser.uid ?
        <TouchableOpacity style={buttonStyles.grayOutlinedButton} onPress={() => navigation.navigate('editProfile')}>
          <Text style={buttonStyles.grayOutlinedButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        :
        renderFollownButton()
      }
      
    </View>
  )
}