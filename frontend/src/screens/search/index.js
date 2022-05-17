import { View, Text, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './styles'
import {SafeAreaView} from 'react-native-safe-area-context'
import { FlatList } from 'react-native'
import SearchUserItem from '../../components/search/userItem'
import { queryUsersByEmail } from '../../services/user'

export default function SearchScreen() {

  const [textInput, setTextInput] = useState('')
  const [searchUsers, setSearchUsers] = useState([])

  useEffect(() => {
      queryUsersByEmail(textInput, setTextInput)
      .then(setSearchUsers)
  }, [textInput])

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={setTextInput} 
        style={styles.textInput} 
        placeholder={"Search"}
      />
      <FlatList
        data={searchUsers}
        renderItem={SearchUserItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}