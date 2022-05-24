import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { Image } from 'react-native'
import {useSelector} from 'react-redux'
import styles from './styles'
import {Ionicons} from '@expo/vector-icons'
import { addComment } from '../../../services/posts'
import { FlatList } from 'react-native'
import ChatSingleItem from '../../../components/chat/single/item'
import { useMessages } from '../../../hooks/useMessages'
import {SafeAreaView} from 'react-native-safe-area-context'
import NavBarGeneral from '../../../components/general/navbar'
import { sendMessage } from '../../../services/chat'

const ChatSingleScreen = ({ route }) => {

  const {chatId, contactId} = route.params
  const [message, setMessage] = useState('')

  const {messages, chatIdInst} = useMessages(chatId, contactId)

  const handleCommentSend = () => {
      if(message.length == 0) {
          return;
      }
      setMessage('')
      sendMessage(chatIdInst, message)
  }

  const renderItem = ({item}) => {
      return <ChatSingleItem item={item}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral title="Chat"/>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex: 1}}>
        <FlatList
              data={messages}
              inverted={-1}
              removeClippedSubviews
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
        />
        <View style={styles.containerInput}>
          <TextInput style={styles.input} value={message} onChangeText={setMessage} placeholder="Send a message..."/>
          <TouchableOpacity onPress={() => handleCommentSend()}>
              <Ionicons name='arrow-up-circle' size={34} color={'crimson'}/>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatSingleScreen