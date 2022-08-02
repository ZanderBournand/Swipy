import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useMemo, useContext} from 'react'
import {useNavigation} from '@react-navigation/native'
import styles from './styles'
import {Ionicons, MaterialCommunityIcons, Feather} from '@expo/vector-icons'
import {throttle} from 'throttle-debounce'
import {useDispatch, useSelector} from 'react-redux'
import {CurrentTrackInViewContext} from "../../../Context/TrackContext"
import {useUser} from "../../../hooks/useUser"
import { getLikeByUpload, updateLike } from '../../../services/upload'
import { useConnected } from '../../../hooks/useConnected'
import { checkConnectStatus, sendConnectRequest } from '../../../services/connect'
import { useLiked } from '../../../hooks/useLiked'
import { useLikedMutation } from '../../../hooks/useLikedMutation'
import { useConnectedMutation } from '../../../hooks/useConnectedMutation'
import {openPopup1} from '../../../redux/actions/popup'

const NewPostOverlay = ({scrollLeft, scrollRight, play, pause}) => {

  const currentUser = useSelector((state) => state.auth.currentUser)

  const [playing, setPlaying] = useState(true)
  const [likeState, setLikeState] = useState(false)

  const {contextTrack} = useContext(CurrentTrackInViewContext)

  const user = useUser(contextTrack?.creator).data
  const newConnected = useConnected(currentUser?.uid, user?.uid, user).data

  const isLiked = useLiked(contextTrack, currentUser?.uid).data
  const isLikedMutation = useLikedMutation()
  
  const navigation = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    setPlaying(true)
  }, [contextTrack])


  const handleUpdateLike = useMemo(
    () =>
      throttle(500, (currentLikeStateInst) => {
        isLikedMutation.mutate({upload: contextTrack, user: currentUser?.uid, newLikeStatus: {
          liked: !currentLikeStateInst.liked,
          count: (currentLikeStateInst.liked) ? currentLikeStateInst.count - 1 : currentLikeStateInst.count + 1 
        }})
      }, {noTrailing: true}),
    [contextTrack]
  );

  useEffect(() => {
    if (isLiked!= null) {
      setLikeState(isLiked?.liked)
    }
  }, [isLiked])

  const togglePlayback = () => {
    if (playing) {
      pause()
    }
    else {
      play()
    }
    setPlaying(!playing)

  }

  return (
    <View style={styles.container}>

      <View style={styles.top}>

        <View style={styles.trackInfo}>
          <View>
            <Text style={styles.title}>{contextTrack?.title}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('profile', {screen: 'profileOther', params: {initialUserId: user?.uid, searched: true}})}>
            <Text style={styles.artist}>{user?.displayName}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            {newConnected?.connected == true || currentUser?.uid == contextTrack?.creator ?
              <View>
                <Feather name="user-check" size={28} color="lightgray" />
              </View>
              :
              <TouchableOpacity style={styles.like} onPress={() => {dispatch(openPopup1({
                user: user,
                track: contextTrack
              }))}}>
                <MaterialCommunityIcons name="handshake-outline" size={30} color="lightgray" />
              </TouchableOpacity>
            }
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.like} onPress={() => handleUpdateLike(isLiked)}>
              <Ionicons size={26} name={likeState ? 'heart' :  'heart-outline'} color='white'/>
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <View style={styles.bottom}>
        <View style={styles.musicButtons}>
          <TouchableOpacity onPress={() => {scrollRight()}}>
            <Ionicons name="play-skip-back-sharp" size={30} color="lightgray" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {togglePlayback()}}>
            <Ionicons name={(playing ? "pause-circle" : "play-circle")} size={55} color="lightgray" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {scrollLeft()}}>
            <Ionicons name="play-skip-forward-sharp" size={30} color="lightgray" />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default NewPostOverlay