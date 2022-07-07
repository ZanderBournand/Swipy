import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useMemo} from 'react'
import {Feather} from '@expo/vector-icons'
import styles from './styles'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/actions'
import { useNavigation } from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import firebase from 'firebase'

export default function NewProfileNavBar({ user, searched }) {

  const dispatch = useDispatch()

  const navigation = useNavigation()

  const handleNavigationGoBack = () => {
    if(searched){
      navigation.goBack();
    }
    else {
      navigation.navigate("Discover")
    }
  }

  return (
    <View style={styles.container}> 
      <TouchableOpacity style={styles.button} onPress={() => {handleNavigationGoBack()}}>
        <Feather name={searched ? "arrow-left" : "search"} size={20} color='white'/>
      </TouchableOpacity>
      <Text style={styles.text}></Text>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.openDrawer()}}>
        {user?.uid === firebase.auth().currentUser.uid &&
          <Feather name="menu" size={24} color='white'/>
        }
      </TouchableOpacity>
    </View>
  )
}