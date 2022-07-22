import { View, Text, TouchableOpacity, FlatList, Image} from 'react-native'
import React, {useEffect, useState, useMemo} from 'react'
import styles from './styles'
import {useSelector} from 'react-redux'
import { Feather, Entypo, Ionicons } from '@expo/vector-icons';
import { getLikeByUpload, updateLike } from '../../../../services/upload';
import {throttle} from 'throttle-debounce'
import { useLiked } from '../../../../hooks/useLiked';
import { useLikedMutation } from '../../../../hooks/useLikedMutation';

const PopularTrack = ({Object, index}) => {

  const currentUser = useSelector((state) => state.auth.currentUser)

  const [currentLikeState, setCurrentLikeState] = useState(false)

  const isLiked = useLiked(Object, currentUser?.uid).data
  const isLikedMutation = useLikedMutation()

  const handleUpdateLike = useMemo(
    () =>
      throttle(500, (currentLikeStateInst) => {
        isLikedMutation.mutate({upload: Object, user: currentUser?.uid, isLiked: currentLikeStateInst})
      }, {noTrailing: true}),
    [Object]
  );

  return (
    <View style={styles.popularTrackContainer}>
        <Text style={styles.popularTrackIndex}>{index + 1}</Text>
        <Image style={styles.popularTrackImage} source={{uri: Object.media.artwork}}/>
        <View style={styles.popularTrackInfo}>
            <Text style={styles.popularTrackTitle}>{Object.title}</Text>
            <Text style={styles.popularTrackType}>{Object.type}</Text>
        </View>
        <TouchableOpacity style={styles.popularTrackButton} onPress={() => handleUpdateLike(isLiked)}>
        <Ionicons size={20} name={isLiked ? 'heart' :  'heart-outline'} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.popularTrackButton} >
            <Entypo name="dots-three-horizontal" size={20} color="lightgray" />
        </TouchableOpacity>
    </View>
  )
}

export default PopularTrack