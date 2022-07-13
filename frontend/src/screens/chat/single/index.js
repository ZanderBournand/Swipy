import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar} from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { Image } from 'react-native'
import {useSelector} from 'react-redux'
import styles from './styles'
import {Ionicons} from '@expo/vector-icons'
import { addComment } from '../../../services/posts'
import { FlatList } from 'react-native'
import ChatSingleItem from '../../../components/chat/single/item'
import { useMessages } from '../../../hooks/useMessages'
import { useNewMessages } from '../../../hooks/useNewMessages'
import {SafeAreaView} from 'react-native-safe-area-context'
import NavBarGeneral from '../../../components/general/navbar'
import { sendMessage } from '../../../services/connect'
import NavBarGeneralBlack from '../../../components/general/navbarBlack'
import FocusAwareStatusBar from '../../../components/general/lightStatusBar'

const ChatSingleScreen = ({ route }) => {

  const {chatId, contactId, user} = route.params
  const [message, setMessage] = useState('')

  const {messages, connectIdInst} = useNewMessages(chatId, contactId)

  const handleCommentSend = () => {
      if(message.length == 0) {
          return;
      }
      setMessage('')
      sendMessage(connectIdInst, message)
  }

  const renderItem = ({item}) => {
      return <ChatSingleItem item={item}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content"/>
      <NavBarGeneralBlack title={user.displayName}/>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex: 1}}>
        <FlatList
              data={messages}
              inverted={-1}
              // removeClippedSubviews
              renderItem={renderItem}
              // initialNumToRender={10}
              // windowSize={10}
              // maxToRenderPerBatch={5}
              keyExtractor={(item) => item.id}
        />
        <View style={styles.containerInput}>
          <TextInput style={styles.input} value={message} onChangeText={setMessage} placeholder="Send a message..." placeholderTextColor="white"/>
          <TouchableOpacity onPress={() => handleCommentSend()}>
              <Ionicons name='arrow-up-circle' size={34} color={'#FEACC6'}/>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatSingleScreen