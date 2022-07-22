import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image, Animated, Dimensions, RefreshControl } from 'react-native'
import * as Animatable from 'react-native-animatable';
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
import ImageHeaderScrollView, {TriggeringView } from 'react-native-image-header-scroll-view'

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

  const animate1 = useRef(null)
  const animate2 = useRef(null)

  const [opacity] = useState(new Animated.Value(1))
  const faded = useRef(false)

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

  const handleScrollOffset = (value) => {
    if (!faded.current && value < -30) {
      faded.current = true
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
    }
    else if (faded.current && value > -30) {
      faded.current = false
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()
    }
  }

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
    <ImageHeaderScrollView
      maxHeight={Dimensions.get('window').height * 0.35}
      minHeight={Dimensions.get('window').height * 0.12}
      renderHeader={() => (
        <>
        <CachedImage source={{uri: user?.photoURL}} style={{ height: Dimensions.get('window').height * 0.35, width: Dimensions.get('window').width, opacity: 0.7}}/>
        </>
      )}
      maxOverlayOpacity={0.6}
      fadeOutForeground={true}
      scrollViewBackgroundColor={'#121212'}
      renderForeground={() => (
        <>
        <Animatable.View style={{flex: 1}} ref={animate1}>
          <Animated.Text style={{color: 'white', backgroundColor: 'transparent',  fontFamily: 'inter_extra_bold', fontSize: 50, position: 'absolute', bottom: '3%', left: '7%', opacity: opacity}}>
            {user?.displayName}
          </Animated.Text>
        </Animatable.View>
        </>
      )}
      renderTouchableFixedForeground={() => (
        <NewProfileNavBar user={user} searched={searched != null ? searched : false}/>
      )}
      renderFixedForeground={() => (
        <SafeAreaView>
          <Animatable.View
            ref={animate2}
            style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, opacity: 0}}
          >
            <Text style={{color: 'lightgray', fontSize: 20, fontWeight: 'bold',}}>{user?.displayName}</Text>
          </Animatable.View>
        </SafeAreaView>
      )}
      scrollEventThrottle={1}
      onScroll={(event) => {
        const scrollOffset = event.nativeEvent.contentOffset.y;
        handleScrollOffset(scrollOffset);
      }}
    >
      <TriggeringView
        onBeginHidden={() => {
          animate2.current.fadeInUp(200)
          animate1.current.fadeOut(200)
        }}
        onDisplay={() => {
          animate2.current.fadeOut(200)
          animate1.current.fadeIn(200)
        }}
      >
        <View style={styles.subHeaderContainer}>
          <View style={styles.statsContainer}>
              <View style={styles.stats}>
                  <Text style={styles.statsNumber}>{(stats != null && stats.length > 0 ? stats[0] : 0)}</Text>
                  <Text style={styles.statsText}>Views</Text>
              </View>
              <View style={styles.stats}>
                  <Text style={styles.statsNumber}>{connectionsCount != null ? connectionsCount : 0}</Text>
                  <Text style={styles.statsText}>Connections</Text>
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
      </TriggeringView>
    </ImageHeaderScrollView>

  )
}

export default NewProfileScreen