import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './styles'
import {SafeAreaView} from 'react-native-safe-area-context'
import { FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import SearchUserItem from '../../components/search/userItem'
import { useIsFocused } from '@react-navigation/core'
import { queryUsersByDisplayName} from '../../services/user'
import FocusAwareStatusBar from '../../components/general/lightStatusBar'

export default function SearchScreen() {

  const [textInput, setTextInput] = useState('')
  const [searchUsers, setSearchUsers] = useState([])

  useEffect(() => {
      queryUsersByDisplayName(textInput, setTextInput)
      .then(setSearchUsers)
  }, [textInput])

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content"/>
      <View style={styles.topContainer}>
        <Text style={{fontFamily: 'inter_black', fontSize: 30, color: 'lightgray'}}>Search</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.textInputContainer}>
          <Feather style={{flex: 1}} name="search" size={24} color="black" />
          <TextInput
            onChangeText={setTextInput} 
            style={styles.textInput} 
            placeholder={"Search"}
            placeholderTextColor="black"
          />
        </View>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 10,}}>
          <Feather name="filter" size={24} color="lightgray" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchUsers}
        renderItem={({item}) => <SearchUserItem item={item}/>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}