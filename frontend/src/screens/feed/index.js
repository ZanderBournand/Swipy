import { View, Text, StatusBar, TouchableOpacity, RefreshControl } from 'react-native'
import React, {useRef, useEffect, useState, useContext} from 'react'
import styles from './styles'
import { FlatList } from 'react-native'
import { Dimensions } from 'react-native'
import PostSingle from '../../components/post'
import { getFeed, getPostsByUserId } from '../../services/posts'
import {SafeAreaView} from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/core'
import * as Device from 'expo-device';
import { CurrentUserProfileItemInViewContext } from '../../Context/UserContext'
import useMaterialNavBarHeight from '../../hooks/useMaterialNavBarHeight'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePosts } from '../../hooks/usePosts'

export default function FeedScreen({route}) {

  const {creator, profile} = route.params
  const { setCurrentUserProfileItemInView } = useContext(CurrentUserProfileItemInViewContext)
  const [posts, setPosts] = useState([])
  const mediaRefs = useRef([])
  const isFocused = useIsFocused()
  const [listRefresh, setListRefresh] = useState(false)

  useEffect(() => {
    getData()
    console.log("geting data")
  }, [])

  const getData = () => {
    setListRefresh(true)
    if(profile) {
      getPostsByUserId(creator).then(setPosts)
      .then(() => {setListRefresh(false)})
    }
    else {
      getFeed().then(setPosts)
      .then(() => {setListRefresh(false)})
    }
  }

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
  
    return isFocused ? <StatusBar {...props} /> : null;
  }

  const onViewableItemsChanged = useRef(({changed}) => {
    changed.forEach(element => {
          const cell = mediaRefs.current[element.key]
          if(cell){
              if(element.isViewable){
                  if(!profile){
                    setCurrentUserProfileItemInView(element.item.creator)
                  }
                  cell.play()
              }
              else{
                  cell.stop()
              }
          }
      })
  })

  const feedItemListHeight = Dimensions.get('window').height - useMaterialNavBarHeight(profile)

  const renderItem = ({item, index}) => {
    return (
        <View style={{flex: 1, height: feedItemListHeight, backgroundColor: 'black' }}>
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