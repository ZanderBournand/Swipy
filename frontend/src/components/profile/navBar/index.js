import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {Feather} from '@expo/vector-icons'
import styles from './styles'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/actions'
import { useNavigation } from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'

export default function ProfileNavBar({ user }) {

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

  return (
    <View style={styles.container}> 
      <TouchableOpacity>
        <Feather name="search" size={20}/>
      </TouchableOpacity>
      <Text style={styles.text}>{user?.displayName}</Text>
      <TouchableOpacity>
        <Feather name="menu" size={24}/>
      </TouchableOpacity>
    </View>
  )
}