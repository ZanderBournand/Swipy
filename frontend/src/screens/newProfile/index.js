import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image, Animated } from 'react-native'
import React, {useContext, useEffect, useState, useRef } from 'react'
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
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';

const NewProfileScreen = ({route}) => {

  const dispatch = useDispatch()
  const navigation = useNavigation();

  const {initialUserId, searched} = route.params;

  const connects = useSelector(state => state.connects.list)
  const currentUser = useSelector((state) => state.auth?.currentUser)

  const user = useUser(initialUserId).data
  const connected = useConnected(currentUser?.uid, user?.uid).data

  const uploads = useUploads(initialUserId)

  const [stats, setStats] = useState(null)
  const [connectedPrev, setConnectedPrev] = useState(null)
  const [connectionsCount, setConnectionsCount] = useState(user?.connections)

  const pan = useRef(new Animated.ValueXY()).current

  useEffect(() => {
    if (user?.uid === currentUser?.uid && connects?.length > connectionsCount) {
      setConnectionsCount(connectionsCount + (connects?.length - connectionsCount))
    }
  }, [connects])

  useEffect(() => {
    if (connected == true && connectedPrev == false) {
      setConnectionsCount(connectionsCount + 1)
    }
    setConnectedPrev(connected)
  }, [connected])

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
          <TouchableOpacity style={styles.followContainer} onPress={() => dispatch(openConnectModal(true, {uploads: uploads, user: user?.uid}))}>
            <Feather style={styles.followButton} name="user-plus" size={24} color="#E9E9E9" />
          </TouchableOpacity>
        }
      </View>
    )
  }

  return (
    <ScrollView 
      bounces={true} style={styles.container}
      scrollEventThrottle={1}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: { y: pan.y } } }],
        {
          useNativeDriver: false
        }
      )}
    > 
      <FocusAwareStatusBar barStyle="light-content"/>
      <View style={styles.profileHeaderContainer}>
        <NewProfileNavBar user={user} searched={searched != null ? searched : false}/>
        <Animated.Image 
        resizeMode="cover"
        style={[styles.profileImage, {
          transform: [
            {
              translateY: pan.y.interpolate({
                inputRange: [-1000, 0],
                outputRange: [-100, 0],
                extrapolate: 'clamp',
              }),
            },
            {
              scale: pan.y.interpolate({
                inputRange: [-3000, 0],
                outputRange: [20, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        }]}
        source={{uri: user?.photoURL}}
        />
        <Text style={styles.username}>{user?.displayName}</Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <View style={styles.statsContainer}>
            <View style={styles.stats}>
                <Text style={styles.statsNumber}>{(stats != null && stats.length > 0 ? stats[0] : 0)}</Text>
                <Text style={styles.statsText}>Views</Text>
            </View>
            <View style={styles.stats}>
                <Text style={styles.statsNumber}>{connectionsCount != null ? connectionsCount : 0}</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('sandbox', {user: currentUser})}}>
                  <Text style={styles.statsText}>Connections</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.buttonsContainer}>
            {user?.uid != currentUser?.uid ? 
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