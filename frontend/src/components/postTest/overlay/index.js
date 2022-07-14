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
import ConfirmationModal from './modal'
import { checkConnectStatus, sendConnectRequest } from '../../../services/connect'
import { useLiked } from '../../../hooks/useLiked'
import { useLikedMutation } from '../../../hooks/useLikedMutation'

const NewPostOverlay = ({scrollLeft, scrollRight, play, pause}) => {

  const currentUser = useSelector((state) => state.auth.currentUser)

  const [playing, setPlaying] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [modal2Visible, setModal2Visible] = useState(false)
  const [modal3Visible, setModal3Visible] = useState(false)

  const {contextTrack} = useContext(CurrentTrackInViewContext)

  const newConnected = useConnected(currentUser.uid, contextTrack?.creator).data

  const isLiked = useLiked(contextTrack, currentUser?.uid).data
  const isLikedMutation = useLikedMutation()

  const user = useUser(contextTrack?.creator).data
  
  const navigation = useNavigation()

  useEffect(() => {
    setPlaying(true)
  }, [contextTrack])

  const handleUpdateLike = useMemo(
    () =>
      throttle(500, (currentLikeStateInst) => {
        isLikedMutation.mutate({upload: contextTrack, user: currentUser.uid, isLiked: currentLikeStateInst})
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
      sendConnectRequest(currentUser.uid, contextTrack?.creator, contextTrack).then((res) => {
        if (res === 'sent') {
          setTimeout(() => {
            setModal2Visible(true)
          }, 200)
        }
        else if (res === 'complete') {
          setTimeout(() => {
            setModal3Visible(true)
          }, 200)
        }
      })
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

      <ConfirmationModal visible={modal2Visible}>
        <View style={styles.titleContainer2}>
          <Text style={styles.titleText}>ERROR</Text>
          <View style={styles.subheaderContainer2}>
            <Text style={styles.descriptionText}>You have already sent a connect request to the {contextTrack?.type == 'song' ? "artist" : "producer"} of this song. Please wait until they answer your invitation before sending another request.</Text>
          </View>
          <View style={styles.buttonsContainer2}>
            <TouchableOpacity onPress={() => {setModal2Visible(false)}}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
          </View>
      </ConfirmationModal>

      <ConfirmationModal visible={modal3Visible}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>You Matched!</Text>
        </View>
        <View style={styles.subheaderContainer}>
          <Text style={styles.descriptionText}>You just matched with your desired {contextTrack?.type == 'song' ? "artist" : "producer"}. Feel free to start you conversation by sending the first message!</Text>
        </View>
        <View style={styles.buttonsContainer3}>
          <TouchableOpacity style={styles.buttonMessages} onPress={() => {
              setModal3Visible(false)
              navigation.navigate('Inbox')
            }}>
              <Text style={styles.buttonConfirmText}>GO TO MESSAGES</Text>
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
            {newConnected == true || currentUser.uid == contextTrack?.creator ?
              <View>
                <Feather name="user-check" size={28} color="lightgray" />
              </View>
              :
              <TouchableOpacity style={styles.like} onPress={() => {setModalVisible(true)}}>
                <MaterialCommunityIcons name="handshake-outline" size={30} color="lightgray" />
              </TouchableOpacity>
            }
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.like} onPress={() => handleUpdateLike(isLiked)}>
              <Ionicons size={26} name={isLiked ? 'heart' :  'heart-outline'} color='white'/>
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