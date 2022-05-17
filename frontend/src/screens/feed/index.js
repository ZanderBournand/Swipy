import { View, Text, StatusBar } from 'react-native'
import React, {useRef, useEffect, useState} from 'react'
import styles from './styles'
import { FlatList } from 'react-native'
import { Dimensions } from 'react-native'
import PostSingle from '../../components/post'
import { getFeed } from '../../services/posts'
import {SafeAreaView} from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/core'
import * as Device from 'expo-device';
import { hasNotch } from '../../services/notch'

export default function FeedScreen() {

  const [posts, setPosts] = useState([])

  const [offset, setOffset] = useState(Dimensions.get('window').height - 54)
  const mediaRefs = useRef([])

  const isFocused = useIsFocused()

  let notch = false;

  useEffect(() => {
    notch = hasNotch();
    if (notch)
        setOffset(Dimensions.get('window').height - 88)
    getFeed().then(setPosts)
  }, [])

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
  
    return isFocused ? <StatusBar {...props} /> : null;
  }

  const onViewableItemsChanged = useRef(({changed}) => {
    changed.forEach(element => {
          const cell = mediaRefs.current[element.key]
          if(cell){
              if(element.isViewable){
                  cell.play()
              }
              else{
                  cell.stop()
              }
          }
      })
  })

  useEffect(() => {

  }, [isFocused])

  const renderItem = ({item, index}) => {
    return (
        <View style={{ flex: 1, height: offset, backgroundColor: 'black'}}>
            <PostSingle item={item} ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)}/>
        </View>
      )
  }

  return (
    <View style={styles.container}>
        <FocusAwareStatusBar barStyle="light-content" backgroundColor='black' />
        <FlatList
                data={posts}
                windowSize={5}
                initialNumToRender={0}
                maxToRenderPerBatch={2}
                removeClippedSubviews={true}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100
                }}
                renderItem={renderItem}
                pagingEnabled
                keyExtractor={item => item.id}
                decelerationRate={'fast'}
                onViewableItemsChanged={onViewableItemsChanged.current}
            />
    </View>
  )
}