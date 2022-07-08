import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import styles from './styles'
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import { FontAwesome, Feather, Fontisto, MaterialIcons } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions'

const DrawerScreen = (props) => {

  const dispatch = useDispatch()

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
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/Swipy_Full_B.png')}/>
      <DrawerContentScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleLogout()}>
            <FontAwesome name="sign-out" size={24} color="lightgray"/>
            <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
            <Feather name="settings" size={24} color="lightgray"/>
            <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
            <Feather name="bookmark" size={24} color="lightgray"/>
            <Text style={styles.buttonText}>Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
            <MaterialIcons name="support-agent" size={24} color="lightgray" />
            <Text style={styles.buttonText}>Support</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </SafeAreaView>
  )
}

export default DrawerScreen