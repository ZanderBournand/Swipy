import { View, Text, StatusBar, Dimensions, FlatList } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { useIsFocused } from '@react-navigation/core'
import {getBeats, getSongs} from '../../services/upload'
import PostSingleTest from '../../components/postTest'
import useMaterialNavBarHeight from '../../hooks/useMaterialNavBarHeight'
import CachedImage from "react-native-expo-cached-image"

const windowWidth = Dimensions.get('window').width;

const NewFeedScreen = ({route}) => {

  const {type} = route.params

  const [work, setWork] = useState([])

  const [fetching, setFetching] = useState(true)

  const mediaRefsTest = useRef([])
  const testRow = useRef(0)

  useEffect(() => {
    if (type == 'songs') {
      getSongs().then((res) => {
        setWork(res)
        let temp = []
        for (let i = 0; i < res.length; i++) {
          temp[i] = []
        }
        mediaRefsTest.current = temp
        setFetching(false)
      })
    }
    else if (type == 'beats') {
      getBeats().then((res) => {
        setWork(res)
        let temp = []
        for (let i = 0; i < res.length; i++) {
          temp[i] = []
        }
        mediaRefsTest.current = temp
        setFetching(false)
      })
    }
  }, [])

  const feedItemListHeight = Dimensions.get('window').height - useMaterialNavBarHeight(false)

  const onViewableItemsChanged2 = ({changed}) => {
    changed.forEach(element => {
      const cell = mediaRefsTest.current[testRow.current][element.index]
      if(cell){
          if(element.isViewable){
            cell.play()
          }
          else{
            cell.stop()
          }
      }
  })
  }

  const onViewableItemsChanged1 = ({ changed }) => {
    changed.forEach(element => {
      if (element.isViewable == true) {
        testRow.current = element.index
        let played = false
        for (let i = 0; i < mediaRefsTest.current[element.index].length; i++) {
          const cell = mediaRefsTest.current[element.index][i]
          if (cell && cell.hasOwnProperty("wasPlaying") && cell.wasPlaying == true) {
            played = true
            const cell = mediaRefsTest.current[element.index][i]
            if (cell) {
              cell.play()
              mediaRefsTest.current[element.index][i].wasPlaying = false
            }
          }
        }
        if (played == false) {
          const cell = mediaRefsTest.current[element.index][0]
          if (cell) {
            cell.play()
          }
        }
      }
      else {
        for (let i = 0; i < mediaRefsTest.current[element.index].length; i++) {
          const cell = mediaRefsTest.current[element.index][i]
          if (cell) {
            cell.stop()
            .then((resp) => {
              if (resp != false) {
                mediaRefsTest.current[element.index][i].wasPlaying = true
              }
            })
          }
        }
      }
    })
  }

  const RenderUserWork = ({item, currentIndex}) => {
    return (
      <View style={{flex: 1, height: feedItemListHeight, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
        <FlatList 
          data={item.work}
          horizontal={true}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 100
          }}
          pagingEnabled
          renderItem={({item, index}) => (<RenderWork item={item} currentIndex={index} topIndex={currentIndex}/>)}
          decelerationRate={'fast'}
          keyExtractor={item => item.id}
          windowSize={5}
          initialNumToRender={0}
          maxToRenderPerBatch={2}
          removeClippedSubviews={true}
          onViewableItemsChanged={onViewableItemsChanged2}
        />
      </View>
    )
  }

  const RenderWork = ({item, currentIndex, topIndex}) => {
    return (
      <View style={{flex: 1, width: windowWidth, alignItems: 'center', justifyContent: 'center'}}>
        <PostSingleTest item={item} ref={PostSingleRef => (mediaRefsTest.current[topIndex][currentIndex] = PostSingleRef)}/>
      </View>
    )
  }

  if (fetching) {
    return (
      <></>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
        <FlatList 
          data={work}
          windowSize={5}
          initialNumToRender={0}
          maxToRenderPerBatch={2}
          removeClippedSubviews={true}
          keyExtractor={(item) => item.user}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 100,
          }}
          onViewableItemsChanged={onViewableItemsChanged1}
          renderItem={({item, index}) => (<RenderUserWork item={item} currentIndex={index}/>)}
          pagingEnabled
          decelerationRate={'fast'}
        />
    </View>
  )
}

export default NewFeedScreen