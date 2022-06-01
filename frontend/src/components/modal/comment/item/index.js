import { View, Text, Image } from 'react-native'
import React, {useEffect} from 'react'
import styles from './styles'
import generalStyles from '../../../../styles/generalStyles'
import {useUser} from '../../../../hooks/useUser'
import CachedImage from "react-native-expo-cached-image"

const CommentItem = ({item}) => {

  const user = useUser(item.creator).data

  return (
    <View style={styles.container}>
      <CachedImage style={generalStyles.avatarSmall} source={{uri: user?.photoURL}}/>
      {/* <Image style={generalStyles.avatarSmall} source={{uri: user.photoURL}}/> */}
      <View style={styles.containerText}>
        <Text style={styles.displayName}>{user?.displayName}</Text> 
        <Text>{item.comment}</Text>
      </View>

    </View>
  )
}

export default CommentItem