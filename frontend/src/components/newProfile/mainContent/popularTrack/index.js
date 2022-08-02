import { View, Text, TouchableOpacity, FlatList, Image, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import React, {useEffect, useState, useMemo, useRef} from 'react'
import styles from './styles'
import {useSelector} from 'react-redux'
import { Feather, Entypo, Ionicons } from '@expo/vector-icons';
import { getLikeByUpload, updateLike } from '../../../../services/upload';
import {throttle} from 'throttle-debounce'
import { useLiked } from '../../../../hooks/useLiked';
import { useLikedMutation } from '../../../../hooks/useLikedMutation';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native'

const PopularTrack = ({Object, index}) => {

  const currentUser = useSelector((state) => state.auth.currentUser)
  const playerState = useSelector(state => state.playerModal)
  const playingState = useSelector(state => state.playerModalPlaying)

  const [currentLikeState, setCurrentLikeState] = useState(false)

  const isLiked = useLiked(Object, currentUser?.uid).data
  const isLikedMutation = useLikedMutation()

  const animation = useRef(null);

  const navigation = useNavigation()

  useEffect(() => {
    if (playingState?.playing) {
      animation.current?.play()
    }
    else {
      animation.current?.pause()
    }
  }, [playingState])

  const handleUpdateLike = useMemo(
    () =>
      throttle(500, (currentLikeStateInst) => {
        isLikedMutation.mutate({upload: Object, user: currentUser?.uid, newLikeStatus: {
          liked: !currentLikeStateInst.liked,
          count: (currentLikeStateInst.liked) ? currentLikeStateInst.count - 1 : currentLikeStateInst.count + 1 
        }})
      }, {noTrailing: true}),
    [Object]
  );

  return (
    <View style={styles.popularTrackContainer}>
        <Text style={styles.popularTrackIndex}>{index + 1}</Text>
        <View style={styles.popularTrackImageContainer}>
          <Image style={styles.popularTrackImage} source={{uri: Object.media.artwork}}/>
          {playerState?.data.track === Object ?
            <View style={styles.overlay}>
              <LottieView 
                ref={animation}
                style={styles.overlayAnimation}
                source={require("../../../../../assets/lottie/lf20_qxtct4ei.json")}
                autoPlay
              />
            </View>
            :
            <></>
          }
        </View>
        <View style={styles.popularTrackInfo}>
            <Text style={styles.popularTrackTitle}>{Object.title}</Text>
            <Text style={styles.popularTrackType}>{Object.type}</Text>
        </View>
        <TouchableOpacity style={styles.popularTrackButton} onPress={() => handleUpdateLike(isLiked)}>
        <Ionicons size={20} name={isLiked?.liked ? 'heart' :  'heart-outline'} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.popularTrackButton} >
            <Entypo name="dots-three-horizontal" size={20} color="lightgray" />
        </TouchableOpacity>
    </View>
  )
}

export default PopularTrack