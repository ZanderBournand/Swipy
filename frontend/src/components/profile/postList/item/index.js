import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'
import {useNavigation} from '@react-navigation/native'

export default function ProfilePostListItem({ item }) {
  
  let [loading, setLoading] = useState(false)

  const navigation = useNavigation()
  
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('userPosts', {creator: item.creator, profile: true})}>
        <Image style={styles.image} source={{uri: item.media[1]}} onLoadStart={() => {setLoading(true)}} onLoadEnd={() => {setLoading(false)}}/>
        {loading ?
          <View style={styles.loader}>
            <ActivityIndicator size="small" color="gray"/>
          </View>
          :
          <></>
        }
    </TouchableOpacity>
  )
}