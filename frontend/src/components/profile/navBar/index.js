import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useMemo} from 'react'
import {Feather} from '@expo/vector-icons'
import styles from './styles'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/actions'
import { useNavigation } from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import firebase from 'firebase'

export default function ProfileNavBar({ user, searched }) {

  const dispatch = useDispatch()

  const navigation = useNavigation()

  const handleLogout = () => {
    dispatch(logout())
    .then(() => {
      console.log("logout successful")
    })
    .catch(() => {
      console.log("logout failed")
    })
  }

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
        <Feather name={searched ? "arrow-left" : "search"} size={20}/>
      </TouchableOpacity>
      <Text style={styles.text}>{user?.displayName}</Text>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.openDrawer()}}>
        {user?.uid === firebase.auth().currentUser.uid &&
          <Feather name="menu" size={24}/>
        }
      </TouchableOpacity>
    </View>
  )
}