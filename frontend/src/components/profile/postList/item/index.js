import { View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'
import {useNavigation} from '@react-navigation/native'

export default function ProfilePostListItem({ item }) { 

  const navigation = useNavigation()
  
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('userPosts', {creator: item.creator, profile: true})}>
        <Image style={styles.image} source={{uri: item?.media[1]}}/>
    </TouchableOpacity>
  )
}

//onLoadStart={() => {setLoading(true)}} onLoadEnd={() => {setLoading(false)}}