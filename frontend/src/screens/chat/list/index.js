import { View, Text, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import NavBarGeneralBlack from '../../../components/general/navbarBlack'
import {SafeAreaView} from 'react-native-safe-area-context'
import styles from './styles'
import ChatListItem from '../../../components/chat/list/item'
import { useSelector } from 'react-redux'
import useFonts from "../../../hooks/useFonts"
import FocusAwareStatusBar from '../../../components/general/lightStatusBar'

const ChatScreen = () => {

  const chats = useSelector(state => state.chat.list)

  const renderItem = ({item}) => {
      return (
          <ChatListItem chat={item}/>
      )
  }

  return (
    <SafeAreaView style={{backgroundColor: '#121212', flex: 1,}}>
        <FocusAwareStatusBar barStyle="light-content"/>
        <View style={styles.topContainer}>
          <Text style={{fontFamily: 'inter_black', fontSize: 30, color: 'lightgray'}}>Messages</Text>
        </View>
        {/* <NavBarGeneralBlack leftButton={{display: false}} title='Direct messages'/> */}
        <FlatList 
            data={chats}
            removeClippedSubviews
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    </SafeAreaView>
  )
}

export default ChatScreen