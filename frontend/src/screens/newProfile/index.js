import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, {useContext, useEffect, useState, useRef} from 'react'
import styles from './styles'
import {SafeAreaView} from 'react-native-safe-area-context'
import { useUser } from '../../hooks/useUser'
import {Feather} from '@expo/vector-icons'
import { CurrentUserProfileItemInViewContext } from '../../Context/UserContext'
import CachedImage from "react-native-expo-cached-image"
import { useIsFocused } from '@react-navigation/core'
import {useDispatch, useSelector} from 'react-redux'
import { useUploads } from '../../hooks/useUploads'
import NewProfileNavBar from '../../components/newProfile/navBar'
import ProfileWorks from '../../components/newProfile/mainContent'
import { useNavigation } from '@react-navigation/native'
import FocusAwareStatusBar from '../../components/general/lightStatusBar'
import { getStats } from '../../services/helpers'
import { useConnected } from '../../hooks/useConnected'
import { openConnectModal } from '../../redux/actions/modal'

const NewProfileScreen = ({route}) => {

  const [stats, setStats] = useState(null)

  const currentUser = useSelector((state) => state.auth.currentUser)

  const {initialUserId, searched} = route.params;

  const { contextUser } = useContext(CurrentUserProfileItemInViewContext)

  const user = useUser(initialUserId ? initialUserId : contextUser).data
  const connected = useConnected(currentUser.uid, user?.uid).data

  const uploads = useUploads(initialUserId ? initialUserId : contextUser)

  const dispatch = useDispatch()
  const navigation = useNavigation();

  useEffect(() => {
    if(user === undefined) {
      return;
    }
  }, [user])

  useEffect(() => {
    if (uploads != null) {
      setStats(getStats(uploads))
    }
  }, [uploads])

  const RenderConnectButton = () => {
    return (
      <View>
        {connected ? 
          <View style={styles.followContainer}>
            <Feather style={styles.followButton} name="user-check" size={24} color="#E9E9E9" />
          </View>
          :
          <TouchableOpacity style={styles.followContainer} onPress={() => dispatch(openConnectModal(true, uploads))}>
            <Feather style={styles.followButton} name="user-plus" size={24} color="#E9E9E9" />
          </TouchableOpacity>
        }
      </View>
    )
  }

  return (
    <ScrollView bounces={true} style={styles.container}> 
      <FocusAwareStatusBar barStyle="light-content"/>
      <View style={styles.profileHeaderContainer}>
        <NewProfileNavBar user={user} searched={searched != null ? searched : false}/>
        <CachedImage style={styles.profileImage} source={{uri: user?.photoURL}}/>
        <Text style={styles.username}>{user?.displayName}</Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <View style={styles.statsContainer}>
            <View style={styles.stats}>
                <Text style={styles.statsNumber}>{(stats != null ? stats[0] : 0)}</Text>
                <Text style={styles.statsText}>Views</Text>
            </View>
            <View style={styles.stats}>
                <Text style={styles.statsNumber}>{(stats != null ? stats[1] : 0)}</Text>
                <Text style={styles.statsText}>Connections</Text>
            </View>
        </View>
        <View style={styles.buttonsContainer}>
            {user?.uid != currentUser.uid ? 
                <RenderConnectButton />
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