import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useMemo, useContext} from 'react'
import {useNavigation} from '@react-navigation/native'
import styles from './styles'
import {Ionicons} from '@expo/vector-icons'
import {throttle} from 'throttle-debounce'
import {useDispatch, useSelector} from 'react-redux'
import {CurrentTrackInViewContext} from "../../../Context/TrackContext"
import {useUser} from "../../../hooks/useUser"
import { getLikeByUpload, updateLike } from '../../../services/upload'

const NewPostOverlay = ({scrollLeft, scrollRight, play, pause}) => {

  const currentUser = useSelector((state) => state.auth.currentUser)

  const [playing, setPlaying] = useState(true)

  const {contextTrack} = useContext(CurrentTrackInViewContext)

  const [currentLikeState, setCurrentLikeState] = useState(false)

  const user = useUser(contextTrack?.creator).data
  
  const navigation = useNavigation()

  useEffect(() => {
    setPlaying(true)
    if (contextTrack != null) {
      getLikeByUpload(contextTrack, currentUser.uid).then((res) => {
        setCurrentLikeState(res)
      })
      .catch((err) => {
        return
      })
    }
  }, [contextTrack])

  const handleUpdateLike = useMemo(
    () =>
      throttle(500, (currentLikeStateInst) => {
        setCurrentLikeState(!currentLikeStateInst);
        updateLike(contextTrack, currentUser.uid, currentLikeStateInst);
      }, {noTrailing: true}),
    [contextTrack]
  );

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
          <TouchableOpacity>
            <Text style={styles.title}>{contextTrack?.title}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.artist}>{user?.displayName}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.likeContainer}>
          <TouchableOpacity style={styles.like} onPress={() => handleUpdateLike(currentLikeState)}>
            <Ionicons size={26} name={currentLikeState ? 'heart' :  'heart-outline'} color='white'/>
          </TouchableOpacity>
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