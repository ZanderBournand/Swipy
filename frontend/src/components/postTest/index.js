import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useRef, useState, forwardRef, useImperativeHandle, useEffect} from 'react'
import styles from './styles'
import {Video} from 'expo-av'
import { useIsFocused } from '@react-navigation/core'
import { useUser } from '../../hooks/useUser'
import { Audio } from 'expo-av';
import PostSingleOverlay from '../post/overlay'
import CachedImage from "react-native-expo-cached-image"

export const PostSingleTest = forwardRef(({item}, parentRef) => {
 
  const ref = useRef(null)
  const user = useUser(item.creator).data

  const [sound, setSound] = useState(null);
  const [waiting, setWaiting] = useState(false)

  let outOfBounds = useRef(false)

  const isFocused = useIsFocused()

  useImperativeHandle(parentRef, () => ({
    play,
    stop,
    unload,
  }))

  useEffect(() => {

    const createSound = async () => {
      const {sound} = await Audio.Sound.createAsync(
        {uri: item.media.audio}
      )
      setSound(sound)
    }

    createSound()

    return () => unload();
  }, [])

  useEffect(() => {
  
    let status2
    
    const getData = async () => {

      if (sound != null) {
        status2 = await sound.getStatusAsync()
      }
      
      if (!isFocused && status2?.isPlaying) {
        stop();
        outOfBounds.current = true;
      }
      else if (isFocused && !status2?.isPlaying && outOfBounds.current) {
        play();
        outOfBounds.current = false;
      }

    }

    getData();

  }, [isFocused])

  useEffect(() => {
    if (waiting) {
      if (sound?._loaded) {
        sound.playAsync()
      }
    }
  }, [sound])
  
  const play = async () => {

    if (isFocused == false) {
      outOfBounds.current = true;
      return;
    }

    if (sound?._loaded) {
      sound.playAsync()
    }
    else {
      setWaiting(true)
    }

    if (ref.current != null) {
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

  }

  const stop = async () => {

    if (sound?._loaded) {
      sound.stopAsync()
    }

    if (ref.current != null) {

      const status = await ref.current.getStatusAsync()
      if(!status?.isPlaying) {
        return false;
      }
      try{
        await ref.current.stopAsync()
      }
      catch(e) {
          console.log(e)
      }
    }

  }

  const unload = async () => {

    if (ref.current != null) {
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
  }

  return (
    <>
      {/* <PostSingleOverlay user={user} post={item}/> */}
      {item.media.hasOwnProperty("video") ?
        <Video
        ref={ref}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
        shouldPlay={false}
        isLooping
        usePoster
        posterSource={{ uri: item.media.artwork }}
        source={{ uri: item.media.video }}
        />
        :
        <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
          <CachedImage style={{width: '70%', aspectRatio: 1/1}} source={{uri: item.media.artwork}}/>
        </View>
      
      }
    </>
  )
})

export default PostSingleTest;