import { View, Text, StatusBar, Dimensions } from 'react-native'
import React, {useState, createContext, useLayoutEffect} from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import FeedScreen from '../../screens/feed'
import ProfileScreen from '../../screens/profile'
import firebase from 'firebase'
import {useSelector} from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const {Screen, Navigator} = createMaterialTopTabNavigator()

const FeedNavigation = () => {

  const navigation = useNavigation()

  const currentUser = useSelector(state => state.auth.currentUser)

  useLayoutEffect(() => {
    if(currentUser.displayName == null || currentUser.photoURL == null) {
      navigation.navigate('modalLogin')
    }
  }, [])

  return (
    <Navigator style={{backgroundColor:'red'}} initialRouteName="feedList" tabBar={() => <></>}>
      <Screen name="feedList" component={FeedScreen} initialParams={{profile: false}}/>
      <Screen name="feedProfile" component={ProfileScreen} initialParams={{initialUserId: null}}/>
    </Navigator>
  )
}

export default FeedNavigation