import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useRef, useState, forwardRef, useImperativeHandle, useEffect, useContext} from 'react'
import styles from './styles'
import {Video} from 'expo-av'
import { useIsFocused } from '@react-navigation/core'
import { useUser } from '../../hooks/useUser'
import { Audio } from 'expo-av';
import { CurrentTrackInViewContext } from '../../Context/TrackContext'
import { updateViews } from '../../services/upload'

export const PostSingleTest = forwardRef(({item}, parentRef) => {
 
  const ref = useRef(null)
  const user = useUser(item.creator).data

  const {setCurrentTrackInViewContext} = useContext(CurrentTrackInViewContext)

  const [sound, setSound] = useState(null);

  const [songDuration, setSongDuration] = useState(null);
  const [songPosition, setSongPosition] = useState(null)
  const [viewed, setViewed] = useState(false)

  const [waiting, setWaiting] = useState(false)

  let outOfBounds = useRef(false)
  let paused = useRef(false)
  let waitingPause = useRef(false)

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
        {uri: item.media.audio},
        {isLooping: true}
      )
      sound.setOnPlaybackStatusUpdate(getStatus)
      setSound(sound)
    }

    createSound()

    return () => {
      unload()
    };
  }, [])

  const getStatus = (playbackStatus) => {
    setSongDuration(playbackStatus.playableDurationMillis)
    setSongPosition(playbackStatus.positionMillis)
  }

  useEffect(() => {
    if (viewed == false) {
      if (songPosition > songDuration * 0.35) {
        setViewed(true)
        updateViews(item)
      }
    }
  }, [songPosition])

  useEffect(() => {
  
    let status2
    
    const getData = async () => {

      if (sound != null) {
        status2 = await sound.getStatusAsync()
      }

      if (paused.current && !isFocused) {
        waitingPause.current = true;
      }
      
      if (!isFocused && (status2?.isPlaying || paused.current)) {
        stop();
        outOfBounds.current = true;
      }
      else if (isFocused && (!status2?.isPlaying || waitingPause.current) && outOfBounds.current) {
        play();
        outOfBounds.current = false;
        waitingPause.current = false;
      }

    }

    getData();

  }, [isFocused])

  useEffect(() => {
    if (waiting) {
      if (sound?._loaded) {
        sound.playAsync()
        paused.current = false
        setCurrentTrackInViewContext(null)
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
      setCurrentTrackInViewContext(null)
      setCurrentTrackInViewContext(item)
      paused.current = false
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
        paused.current = true
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

      if (soundStatus?.isPlaying || paused.current) {
        try {
          sound.stopAsync()
        }
        catch (e) {
          console.log(e)
        }
      }
      else {
        return false;
      }

    }

    if (ref.current != null) {

      const status = await ref.current.getStatusAsync()

      if(status?.isPlaying || paused.current) {
        try{
          await ref.current.stopAsync()
          paused.current = false
          return true
        }
        catch(e) {
            console.log(e)
        }
      }
      else {
        return false;
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
          <Image style={{width: '90%', aspectRatio: 1/1}} source={{uri: item.media.artwork}}/>
        </View>
      
      }
    </>
  )
})

export default PostSingleTest;