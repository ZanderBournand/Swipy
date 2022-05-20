import { View, Text } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function SearchUserItem({ item }) {

  const navigation = useNavigation()

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('profileOther', {initialUserId: item?.uid})}>
      <Text style={styles.text}>{item.displayName}</Text>
      <Image style={styles.image} source={{uri: item.photoURL}}/>
    </TouchableOpacity>
  )
}