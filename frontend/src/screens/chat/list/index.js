import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import NavBarGeneralBlack from '../../../components/general/navbarBlack'
import {SafeAreaView} from 'react-native-safe-area-context'
import styles from './styles'
import ChatListItem from '../../../components/chat/list/item'
import { useSelector } from 'react-redux'
import useFonts from "../../../hooks/useFonts"
import { Feather } from '@expo/vector-icons';
import FocusAwareStatusBar from '../../../components/general/lightStatusBar'
import { useNavigation } from '@react-navigation/native'
import { getPendingConnects } from '../../../services/connect'

const ChatScreen = () => {
  
  const navigation = useNavigation()

  const connects = useSelector(state => state.connects.list)

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
          <TouchableOpacity onPress={() => {navigation.navigate('invitations')}}>
            <Feather name="user-plus" size={24} color="lightgray" />
          </TouchableOpacity>
        </View>
        {connects?.length > 0 ?
          <FlatList 
            data={connects}
            removeClippedSubviews
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          :
          <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No Connects. Start Swiping!</Text>
          </View>
        }
    </SafeAreaView>
  )
}

export default ChatScreen