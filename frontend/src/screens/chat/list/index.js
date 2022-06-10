import { View, Text, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import NavBarGeneral from '../../../components/general/navbar'
import {SafeAreaView} from 'react-native-safe-area-context'
import styles from './styles'
import ChatListItem from '../../../components/chat/list/item'
import { useSelector } from 'react-redux'
import useFonts from "../../../hooks/useFonts"

const ChatScreen = () => {

  const chats = useSelector(state => state.chat.list)

  const renderItem = ({item}) => {
      return (
          <ChatListItem chat={item}/>
      )
  }

  return (
    <SafeAreaView style={{backgroundColor: '#E4E4E4', flex: 1,}}>
        <NavBarGeneral leftButton={{display: false}} title='Direct messages'/>
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