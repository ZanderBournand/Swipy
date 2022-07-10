import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useMemo} from 'react'
import styles from './styles'
import CachedImage from 'react-native-expo-cached-image'
import { Feather, Ionicons } from '@expo/vector-icons'; 
import {useSelector} from 'react-redux'
import {throttle} from 'throttle-debounce'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {dateFormat} from "../../../services/helpers"
import { getLikeByUpload, updateLike } from '../../../services/upload';

const BestWorkItemBlack = ({ item }) => {

  const currentUser = useSelector((state) => state.auth.currentUser)

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const [currentLikeState, setCurrentLikeState] = useState({state: false, counter: item.likesCount})

  useEffect(() => {
    if (item != null) {
      getLikeByUpload(item, currentUser.uid).then((res) => {
        setCurrentLikeState({
          ...currentLikeState,
          state: res,
        })
      })
      .catch((err) => {
        return
      })
    }
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
        updateLike(item, currentUser.uid, currentLikeStateInst.state);
      }, {noTrailing: true}),
    [item]
  );

  return (
    <View style={styles.container}>
      <View style={{flex: 1, backgroundColor: 'row'}}>
        <CachedImage source={{uri: item.media.artwork}} style={styles.artwork}/>
      </View>
      <View style={styles.description}>
        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{fontFamily: 'inter_medium', fontSize: 18, flex: 1, color: 'lightgray'}}>{item.title}</Text>
        <Text style={{paddingBottom: 15, fontSize: 16, flex: 0.7, color: 'lightgray'}}>
          {dateFormat(new Date(item.creation.seconds * 1000).toISOString().slice(0, 10))} - <Text style={{fontWeight: '500', color: 'lightgray'}}>{capitalizeFirstLetter(item.type)}</Text>
        </Text>
        <View style={styles.stats}>
          <View style={styles.statsItem}>
            <Feather name="play-circle" size={24} color="gray" />
            <Text style={styles.statsText}>{item.playsCount}</Text>
          </View>
          <View style={styles.statsItem}>
            <TouchableOpacity onPress={() => handleUpdateLike(currentLikeState)}>
              <Ionicons size={23} name={currentLikeState.state ? 'heart' :  'heart-outline'} color='white'/>
            </TouchableOpacity>
            <Text style={styles.statsText}>{currentLikeState.counter}</Text>
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