import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect, useMemo, useRef} from 'react'
import styles from './styles'
import { Feather, Ionicons } from '@expo/vector-icons'; 
import {useSelector} from 'react-redux'
import {throttle} from 'throttle-debounce'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {dateFormat} from "../../../services/helpers"
import { getLikeByUpload, updateLike } from '../../../services/upload';
import { useLiked } from '../../../hooks/useLiked';
import { useLikedMutation } from '../../../hooks/useLikedMutation';
import LottieView from 'lottie-react-native'

const BestWorkItemBlack = ({ item }) => {

  const currentUser = useSelector((state) => state.auth.currentUser)
  const playingState = useSelector(state => state.playerModalPlaying)
  const playerState = useSelector(state => state.playerModal)

  const isLiked = useLiked(item, currentUser?.uid).data
  const isLikedMutation = useLikedMutation()

  const [likeCounter, setLikeCounter] = useState(item.likesCount)
  const animation = useRef(null);

  const timestamp = (item?.creation.hasOwnProperty('seconds')) ? item?.creation.seconds * 1000 : new Date().getTime()

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleUpdateLike = useMemo(
    () =>
      throttle(500, (currentLikeStateInst) => {
        setLikeCounter(likeCounter + (currentLikeStateInst ?  -1 : 1))
        item.likesCount = item.likesCount + (currentLikeStateInst ?  -1 : 1)
        isLikedMutation.mutate({upload: item, user: currentUser?.uid, newLikeStatus: {
          liked: !currentLikeStateInst.liked,
          count: (currentLikeStateInst.liked) ? currentLikeStateInst.count - 1 : currentLikeStateInst.count + 1 
        }})
      }, {noTrailing: true}),
    [item]
  );

  useEffect(() => {
    if (playingState?.playing) {
      animation.current?.play()
    }
    else {
      animation.current?.pause()
    }
  }, [playingState])

  return (
    <View style={styles.container}>
      <View style={{flex: 1, backgroundColor: 'row'}}>
        <Image source={{uri: item.media.artwork}} style={styles.artwork}/>
        {playerState?.data.track === item ?
          <View style={styles.overlay}>
            <LottieView 
              ref={animation}
              style={styles.overlayAnimation}
              source={require("../../../../assets/lottie/lf20_qxtct4ei.json")}
              autoPlay
            />
          </View>
          :
          <></>
        }
      </View>
      <View style={styles.description}>
        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{fontFamily: 'inter_medium', fontSize: 18, flex: 1, color: 'lightgray'}}>{item.title}</Text>
        <Text style={{paddingBottom: 15, fontSize: 16, flex: 0.7, color: 'lightgray'}}>
          {dateFormat(new Date(timestamp).toISOString().slice(0, 10))} - <Text style={{fontWeight: '500', color: 'lightgray'}}>{capitalizeFirstLetter(item.type)}</Text>
        </Text>
        <View style={styles.stats}>
          <View style={styles.statsItem}>
            <Feather name="play-circle" size={24} color="gray" />
            <Text style={styles.statsText}>{item.playsCount}</Text>
          </View>
          <View style={styles.statsItem}>
            <TouchableOpacity onPress={() => handleUpdateLike(isLiked)}>
              <Ionicons size={23} name={isLiked?.liked ? 'heart' :  'heart-outline'} color='white'/>
            </TouchableOpacity>
            <Text style={styles.statsText}>{isLiked?.count}</Text>
          </View>
          <View style={styles.statsItem}>
            <MaterialCommunityIcons name="handshake-outline" size={24} color="gray" />
            <Text style={styles.statsText}>{item.interactionsCount}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default BestWorkItemBlack