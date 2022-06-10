import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import CachedImage from 'react-native-expo-cached-image'
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {dateFormat} from "../../../services/helpers"

const BestWorkItem = ({ item }) => {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1, backgroundColor: 'row'}}>
        <CachedImage source={{uri: item.media.artwork}} style={styles.artwork}/>
      </View>
      <View style={styles.description}>
        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{fontFamily: 'inter_medium', fontSize: 18, flex: 1}}>{item.title}</Text>
        <Text style={{paddingBottom: 15, fontSize: 16, flex: 0.7}}>
          {dateFormat(new Date(item.creation.seconds * 1000).toISOString().slice(0, 10))} - <Text style={{fontWeight: '500'}}>{capitalizeFirstLetter(item.type)}</Text>
        </Text>
        <View style={styles.stats}>
          <View style={styles.statsItem}>
            <Feather name="play-circle" size={24} color="gray" />
            <Text style={styles.statsText}>{item.playsCount}</Text>
          </View>
          <View style={styles.statsItem}>
            <Feather name="heart" size={23} color="gray" />
            <Text style={styles.statsText}>{item.likesCount}</Text>
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

export default BestWorkItem