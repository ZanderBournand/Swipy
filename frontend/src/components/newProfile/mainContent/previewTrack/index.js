import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import React, {useRef, useEffect} from 'react'
import LottieView from 'lottie-react-native'
import styles from './styles'
import {useSelector, useDispatch} from 'react-redux'

const PreviewTrack = ({item}) => {

  const playerState = useSelector(state => state.playerModal)
  const playingState = useSelector(state => state.playerModalPlaying)

  const animation = useRef(null);

  useEffect(() => {
    if (playingState?.playing) {
      animation.current?.play()
    }
    else {
      animation.current?.pause()
    }
  }, [playingState])

  return (
    <View style={styles.previewTrackContainer}>
        <View>
            <Image style={styles.previewTrackImageContainer} source={{uri: item.media.artwork}}/>
            {playerState?.data.track === item ?
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
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <Text style={styles.previewTrackTitle}>{item.title}</Text>
            <Text style={{color: 'gray'}}>{item.type}</Text>
        </View>
    </View>
  )
}

export default PreviewTrack