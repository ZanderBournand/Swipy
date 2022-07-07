import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, {useContext, useEffect, useState, useRef} from 'react'
import styles from './styles'
import {SafeAreaView} from 'react-native-safe-area-context'
import { useUser } from '../../hooks/useUser'
import {Feather} from '@expo/vector-icons'
import { CurrentUserProfileItemInViewContext } from '../../Context/UserContext'
import CachedImage from "react-native-expo-cached-image"
import { useIsFocused } from '@react-navigation/core'
import { useUploads } from '../../hooks/useUploads'
import NewProfileNavBar from '../../components/newProfile/navBar'
import ProfileWorks from '../../components/newProfile/mainContent'
import { useNavigation } from '@react-navigation/native'

const NewProfileScreen = ({route}) => {

  const {initialUserId, searched} = route.params;

  const { contextUser } = useContext(CurrentUserProfileItemInViewContext)

  const user = useUser(initialUserId ? initialUserId : contextUser).data

  const uploads = useUploads(user?.uid).data

  const navigation = useNavigation();

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
  
    return isFocused ? <StatusBar {...props} /> : null;
  }

  useEffect(() => {
    if(user === undefined) {
      return;
    }
  }, [user])

  return (
    <ScrollView bounces={true} style={styles.container}> 
      <FocusAwareStatusBar barStyle="light-content"/>
      <View style={styles.profileHeaderContainer}>
        <NewProfileNavBar user={user} searched={searched != null ? searched : false}/>
        <CachedImage style={styles.profileImage} source={{uri: user.photoURL}}/>
        <Text style={styles.username}>{user.displayName}</Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <View style={styles.statsContainer}>
            <View style={styles.stats}>
                <Text style={styles.statsNumber}>15.6K</Text>
                <Text style={styles.statsText}>Views</Text>
            </View>
            <View style={styles.stats}>
                <Text style={styles.statsNumber}>26</Text>
                <Text style={styles.statsText}>Connections</Text>
            </View>
        </View>
        <View style={styles.buttonsContainer}>
            {searched != null ? 
                <TouchableOpacity style={styles.followContainer}>
                    <Feather style={styles.followButton} name="user-plus" size={24} color="#E9E9E9" />
                </TouchableOpacity>
            :
                <TouchableOpacity style={styles.followContainer} onPress={() => navigation.navigate('editProfile')}>
                    <Feather style={styles.followButton} name="edit-2" size={24} color="#E9E9E9" />
                </TouchableOpacity>
            }
        </View>
      </View>
      <ProfileWorks work={uploads} user={user}/>
    </ScrollView>
  )
}

export default NewProfileScreen