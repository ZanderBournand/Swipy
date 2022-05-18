import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'

export default function ProfilePostListItem({ item }) {
  
  let [loading, setLoading] = useState(false)
  
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={{uri: item.media[1]}} onLoadStart={() => {setLoading(true)}} onLoadEnd={() => {setLoading(false)}}/>
        {loading ?
          <View style={styles.loader}>
            <ActivityIndicator size="small" color="gray"/>
          </View>
          :
          <></>
        }
    </View>
  )
}