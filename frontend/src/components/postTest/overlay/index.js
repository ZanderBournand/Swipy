import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useMemo, useContext} from 'react'
import {useNavigation} from '@react-navigation/native'
import styles from './styles'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {throttle} from 'throttle-debounce'
import {useDispatch, useSelector} from 'react-redux'
import {CurrentTrackInViewContext} from "../../../Context/TrackContext"
import {useUser} from "../../../hooks/useUser"
import { getLikeByUpload, updateLike } from '../../../services/upload'
import ConfirmationModal from './modal'
import { sendConnectRequest } from '../../../services/connect'

const NewPostOverlay = ({scrollLeft, scrollRight, play, pause}) => {

  const currentUser = useSelector((state) => state.auth.currentUser)

  const [playing, setPlaying] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

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

  const sendInvitation = () => {
    if (currentUser != null && contextTrack != null) {
      sendConnectRequest(currentUser.uid, contextTrack?.creator, contextTrack)
    }
  }

  return (
    <View style={styles.container}>

      <ConfirmationModal visible={modalVisible}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Request Confirmation</Text>
        </View>
        <View style={styles.subheaderContainer}>
          <Text style={styles.descriptionText}>The following will send a Connect Invitation to the {contextTrack?.type == 'song' ? "artist" : "producer"} of the song you interacted with</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonCancel} onPress={() => {setModalVisible(false)}}>
              <Text style={styles.buttonCancelText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonConfirm} onPress={() => {
              sendInvitation()
              setModalVisible(false)
            }}>
              <Text style={styles.buttonConfirmText}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </ConfirmationModal>

      <View style={styles.top}>

        <View style={styles.trackInfo}>
          <View>
            <Text style={styles.title}>{contextTrack?.title}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('profileOther', {initialUserId: user?.uid, searched: true})}>
            <Text style={styles.artist}>{user?.displayName}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.like} onPress={() => {setModalVisible(true)}}>
              <MaterialCommunityIcons name="handshake-outline" size={30} color="lightgray" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.like} onPress={() => handleUpdateLike(currentLikeState)}>
              <Ionicons size={26} name={currentLikeState ? 'heart' :  'heart-outline'} color='white'/>
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