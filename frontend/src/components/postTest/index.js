import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useRef, useState, forwardRef, useImperativeHandle, useEffect, useContext} from 'react'
import styles from './styles'
import {Video} from 'expo-av'
import { useIsFocused } from '@react-navigation/core'
import { useUser } from '../../hooks/useUser'
import { Audio } from 'expo-av';
import PostSingleOverlay from '../post/overlay'
import CachedImage from "react-native-expo-cached-image"
import NewPostOverlay from './overlay'
import { CurrentTrackInViewContext } from '../../Context/TrackContext'

export const PostSingleTest = forwardRef(({item}, parentRef) => {
 
  const ref = useRef(null)
  const user = useUser(item.creator).data

  const {setCurrentTrackInViewContext} = useContext(CurrentTrackInViewContext)

  const [sound, setSound] = useState(null);
  const [waiting, setWaiting] = useState(false)

  let outOfBounds = useRef(false)

  const isFocused = useIsFocused()

  useImperativeHandle(parentRef, () => ({
    play,
    pause,
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

    return () => {
      unload()
    };
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
        setCurrentTrackInViewContext(item)
      }
    }
  }, [sound])
  
  const play = async () => {

    if (isFocused == false) {
      outOfBounds.current = true;
      return;
    }

    if (sound?._loaded) {

      const soundStatus = await sound.getStatusAsync()

      if (soundStatus.isPlaying == true) {
        return;
      }
      setCurrentTrackInViewContext(item)
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

  const pause = async () => {

    if (sound?._loaded) {

      const soundStatus = await sound.getStatusAsync()

      if (!soundStatus?.isPlaying) {
        return false;
      }
      try {
        sound.pauseAsync()
      }
      catch (e) {
        console.log(e)
      }

    }

    if (ref.current != null) {

      const status = await ref.current.getStatusAsync()

      if(!status?.isPlaying) {
        return false;
      }
      try{
        await ref.current.pauseAsync()
        return true
      }
      catch(e) {
          console.log(e)
      }
    }

  }

  const stop = async () => {

    if (sound?._loaded) {

      const soundStatus = await sound.getStatusAsync()

      if (!soundStatus?.isPlaying) {
        return false;
      }
      try {
        sound.stopAsync()
      }
      catch (e) {
        console.log(e)
      }

    }

    if (ref.current != null) {

      const status = await ref.current.getStatusAsync()

      if(!status?.isPlaying) {
        return false;
      }
      try{
        await ref.current.stopAsync()
        return true
      }
      catch(e) {
          console.log(e)
      }
    }

  }

  const unload = async () => {

    if (sound?._loaded) {
      try {
        sound.unloadAsync()
      }
      catch (e) {
        console.log(e)
      }

    }

    if (ref.current != null) {
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
      {/* <View style={styles.overlayContainer}> 

        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.artist}>{user?.displayName}</Text>
        </View>

        <View>

        </View>
        
      </View> */}

      {/* <NewPostOverlay user={user} post={item} /> */}

      {item.media.hasOwnProperty("video") ?
        <Video
        ref={ref}
        style={{width: '100%', height: '100%', opacity: 0.5}}
        resizeMode="cover"
        shouldPlay={false}
        isLooping
        usePoster
        posterSource={{ uri: item.media.artwork }}
        source={{ uri: item.media.video }}
        />
        :
        <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
          <CachedImage style={{width: '90%', aspectRatio: 1/1}} source={{uri: item.media.artwork}}/>
        </View>
      
      }
    </>
  )
})

export default PostSingleTest;