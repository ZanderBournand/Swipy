import { View, Text, Image } from 'react-native'
import React, {useState, useEffect, useMemo} from 'react'
import styles from './styles'
import { TouchableOpacity } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import { getLikeById, updateLike } from '../../../services/posts'
import {useSelector} from 'react-redux'
import {throttle} from 'throttle-debounce'

export default function PostSingleOverlay({user, post}) {

  const currentUser = useSelector((state) => state.auth.currentUser)

  const [currentLikeState, setCurrentLikeState] = useState({state: false, counter: post.likesCount})

  useEffect(() => {
    getLikeById(post.id, currentUser.uid).then((res) => {
      setCurrentLikeState({
        ...currentLikeState,
        state: res,
      })
    })
  }, [])
  
  const handleUpdateLike = useMemo(
    () =>
      throttle(500, (currentLikeStateInst) => {
        setCurrentLikeState({
          state: !currentLikeStateInst.state,
          counter:
            currentLikeStateInst.counter +
            (currentLikeStateInst.state ? -1 : 1),
        });
        updateLike(post.id, currentUser.uid, currentLikeStateInst.state);
      }, {noTrailing: true}),
    []
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.displayName}>{user?.displayName}</Text>
        <Text style={styles.description}>{post?.description}</Text>
      </View>

      <View style={styles.leftContainer}>
        <Image style={styles.avatar} source={{uri: user?.photoURL}}/>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleUpdateLike(currentLikeState)}>
          <Ionicons color="white" size={40} name={currentLikeState.state ? 'heart' : "heart-outline"}/>
          <Text style={styles.actionButtonText}>{currentLikeState.counter}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}