import { View, Text } from 'react-native'
import React, {useRef, forwardRef, useImperativeHandle, useEffect} from 'react'
import styles from './styles'
import {Video} from 'expo-av'
import { useIsFocused } from '@react-navigation/core'
import { useUser } from '../../hooks/useUser'
import PostSingleOverlay from './overlay'

export const PostSingle = forwardRef(({item}, parentRef) => {
 
  const ref = useRef(null)
  const user = useUser(item.creator).data

  let outOfBounds = useRef(false)

  const isFocused = useIsFocused()

  useImperativeHandle(parentRef, () => ({
    play,
    stop,
    unload,
  }))

  useEffect(() => {
    return () => unload();
  }, [])

  useEffect(() => {
    
    let status;
    
    const getData = async () => {
      status = await ref.current.getStatusAsync()
      
      if (!isFocused && status?.isPlaying) {
        stop();
        outOfBounds.current = true;
      }
      else if (isFocused && !status?.isPlaying && outOfBounds.current) {
        play();
        outOfBounds.current = false;
      }

    }

    getData();

  }, [isFocused])
  
  const play = async () => {
      if(ref.current == null) {
          return;
      }

      const status = await ref.current.getStatusAsync()
      if(status?.isPlaying) {
          return;
      }
      try{
        await ref.current.playAsync()
      }
      catch(e) {
          console.log(e)
      }
  }

  const stop = async () => {
    if(ref.current == null) {
        return;
    }

    const status = await ref.current.getStatusAsync()
    if(!status?.isPlaying) {
        return;
    }
    try{
      await ref.current.stopAsync()
    }
    catch(e) {
        console.log(e)
    }

  }

  const unload = async () => {
    if(ref.current == null) {
        return;
    }
    try{
      await ref.current.unloadAsync()
    }
    catch(e) {
        console.log(e)
    }

  }

  return (
    <>
      <PostSingleOverlay user={user} post={item}/>
      <Video
          ref={ref}
          style={styles.container}
          resizeMode="cover"
          shouldPlay={false}
          isLooping
          usePoster
          posterSource={{ uri: item.media[1] }}
          source={{uri: item.media[0]}}
      />
    </>
  )
})

export default PostSingle;