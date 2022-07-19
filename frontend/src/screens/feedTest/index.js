import { View, Text, StatusBar, Dimensions, FlatList } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { useIsFocused } from '@react-navigation/core'
import {getBeats, getSongs} from '../../services/upload'
import PostSingleTest from '../../components/postTest'
import useMaterialNavBarHeight from '../../hooks/useMaterialNavBarHeight'
import NewPostOverlay from '../../components/postTest/overlay'
import { useIsFetching } from 'react-query'

const windowWidth = Dimensions.get('window').width;

const NewFeedScreen = ({route}) => {

  const {type} = route.params

  const [work, setWork] = useState([])

  const [fetching, setFetching] = useState(true)

  const flatlistRef = useRef([])
  const currentRow = useRef(0)

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

  const scrollLeft = () => {
    let index = flatlistRef.current[currentRow.current].currIndex + 1;
    try {
      flatlistRef.current[currentRow.current].scrollToIndex({animated: true, index: index})
    }
    catch (e) {
      return;
    }
  }

  const scrollRight = () => {
    let index = flatlistRef.current[currentRow.current].currIndex - 1;
    try {
      flatlistRef.current[currentRow.current].scrollToIndex({animated: true, index: index})
    }
    catch (e) {
      return;
    }
  }

  const togglePlay = () => {
    let row = currentRow.current
    let column = flatlistRef.current[currentRow.current].currIndex
    const cell = mediaRefsTest.current[row][column]
    if (cell) {
      cell.play()
    }
  }

  const togglePause = () => {
    let row = currentRow.current
    let column = flatlistRef.current[currentRow.current].currIndex
    const cell = mediaRefsTest.current[row][column]
    if (cell) {
      cell.pause()
    }
  }

  const feedItemListHeight = Dimensions.get('window').height - useMaterialNavBarHeight(false)

  const onViewableItemsChanged2 = ({changed}) => {
    changed.forEach(element => {
      const cell = mediaRefsTest.current[testRow.current][element.index]
      if(cell){
          if(element.isViewable){
            flatlistRef.current[currentRow.current].currIndex = element.index
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
        currentRow.current = element.index
        if (flatlistRef.current[currentRow.current].currIndex == null) {
          flatlistRef.current[currentRow.current].currIndex = 0
          flatlistRef.current[currentRow.current].wasPlaying = -1
        }
        let played = false
        const fRef = flatlistRef.current[currentRow.current]
        if (fRef && fRef.wasPlaying != -1) {
          played = true
          const cell = mediaRefsTest.current[element.index][fRef.wasPlaying]
          if (cell) {
            cell.play()
            flatlistRef.current[currentRow.current].wasPlaying = -1
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
              flatlistRef.current[currentRow.current].wasPlaying = i
              }
            })
          }
        }
      }
    })
  }

  const RenderUserWork = ({item, currentIndex}) => {
    return (
      <>
      <NewPostOverlay scrollLeft={scrollLeft} scrollRight={scrollRight} play={togglePlay} pause={togglePause}/>
      <View style={{flex: 1, height: feedItemListHeight, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
        <FlatList 
          data={item.work}
          horizontal={true}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 100,
          }}
          pagingEnabled
          renderItem={({item, index}) => (<RenderWork item={item} currentIndex={index} topIndex={currentIndex}/>)}
          decelerationRate={'fast'}
          keyExtractor={item => item.id}
          windowSize={4}
          initialNumToRender={0}
          maxToRenderPerBatch={2}
          removeClippedSubviews={true}
          ref={(fRef) => {
            flatlistRef.current[currentIndex] = fRef
          }}
          onViewableItemsChanged={onViewableItemsChanged2}
        />
      </View>
      </>
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
    <>
    <View style={{flex: 1, backgroundColor: 'black'}}>
        <FlatList 
          data={work}
          windowSize={4}
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
    </>
  )
}

export default NewFeedScreen