import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './styles'
import {SafeAreaView} from 'react-native-safe-area-context'
import { FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import SearchUserItem from '../../components/search/userItem'
import { queryUsersByDisplayName} from '../../services/user'

export default function SearchScreen() {

  const [textInput, setTextInput] = useState('')
  const [searchUsers, setSearchUsers] = useState([])

  useEffect(() => {
      queryUsersByDisplayName(textInput, setTextInput)
      .then(setSearchUsers)
  }, [textInput])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={{fontFamily: 'inter_black', fontSize: 30}}>Search</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.textInputContainer}>
          <Feather style={{flex: 1}} name="search" size={24} color="black" />
          <TextInput
            onChangeText={setTextInput} 
            style={styles.textInput} 
            placeholder={"Search"}
          />
        </View>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 10,}}>
          <Feather name="filter" size={24} color="black" />
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