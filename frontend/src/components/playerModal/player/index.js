import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import {Ionicons, MaterialCommunityIcons, Feather} from '@expo/vector-icons'
import { Audio } from 'expo-av';
import { changePlayingStatus, openPlayerModal } from '../../../redux/actions/playerModal'
import { updateViews } from '../../../services/upload'
import shorthash from 'shorthash';
import * as FileSystem from 'expo-file-system'

const Player = () => {
    
  const playerState = useSelector(state => state.playerModal)
  const item = playerState?.data.track

  const [playing, setPlaying] = useState(true)
  const [sound, setSound] = useState(null);

  const dispatch = useDispatch()

  const getURI = async (uri) => {
    const name = shorthash.unique(uri)
    const path = `${FileSystem.cacheDirectory}${name}`;
    const audio = await FileSystem.getInfoAsync(path + ".mp3");
    if (audio.exists) {
      return audio.uri
    }
    const newAudio = await FileSystem.downloadAsync(uri, path + ".mp3")
    return newAudio.uri
  }

  useEffect(() => {

    if (!playerState?.open) {
        unload()
        return;
    }

    setPlaying(true)

    if (sound == null) {
        const createSound = async () => {
            const uriToDownload = await getURI(item?.media.audio)
            const {sound} = await Audio.Sound.createAsync(
              {uri: uriToDownload},
              {isLooping: false, shouldPlay: true}
            )
            dispatch(changePlayingStatus(true))
            sound.setOnPlaybackStatusUpdate(getStatus)
            setSound(sound)
        }
      
        createSound()
    }
    else {
        if (sound?._loaded) {
          unload();
        }
        const changeSound = async () => {
          const uriToDownload = await getURI(item?.media.audio)
          sound.loadAsync({uri: uriToDownload}, {shouldPlay: true})
          dispatch(changePlayingStatus(true))
        }
        changeSound()
    }

  }, [playerState])
  
  const getStatus = (playbackStatus) => {

    if(playbackStatus.didJustFinish) {
        setPlaying(false)
        dispatch(changePlayingStatus(false))
    }

  }

  const handlePlayPause = async () => {

    if (sound?._loaded) {
        
      const soundStatus = await sound.getStatusAsync()

      setPlaying(!playing)

      if (soundStatus.isPlaying) {
        dispatch(changePlayingStatus(false))
        sound.pauseAsync()
      }
      else {
        if (soundStatus.playableDurationMillis - soundStatus.positionMillis < 0.005 * soundStatus.playableDurationMillis) {
            sound.replayAsync()
        }
        dispatch(changePlayingStatus(true))
        sound.playAsync()
      }
    }

    setPlaying(!playing)
  }

  const handleNext = async () => {

    const index = playerState?.data.index
    const newIndex = (index == playerState?.data.list.length - 1) ? 0 : index + 1

    await unload();
    
    dispatch(openPlayerModal({
        user: playerState?.data.user,
        list: playerState?.data.list,
        index: newIndex,
        track: playerState?.data.list[newIndex]
    }))
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
  }
  
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image style={styles.artwork} source={{uri: item?.media.artwork}}/>
        </View>
        <View style={styles.trackInformationContainer}>
            <View style={styles.info}>
                <Text style={{color: 'white', fontSize: 16}}>
                    {item?.title}  ·  {playerState?.data.user}
                </Text>
            </View>
            <View style={styles.type}>
                <Text style={{color: 'gray', fontSize: 15}}>{item?.type}</Text>
            </View>
        </View>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => {handlePlayPause()}}>
                <Ionicons name={(playing) ? "ios-pause-sharp" : "play-sharp"} size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {handleNext()}}>
                <Ionicons name="play-skip-forward-sharp" size={28} color="white" />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Player