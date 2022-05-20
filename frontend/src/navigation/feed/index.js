import { View, Text, StatusBar, Dimensions } from 'react-native'
import React, {useState, createContext} from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import FeedScreen from '../../screens/feed'
import ProfileScreen from '../../screens/profile'

const {Screen, Navigator} = createMaterialTopTabNavigator()

export const CurrentUserProfileItemInViewContext = createContext(null)

const FeedNavigation = () => {

  const [currentUserProfileItemInView, setCurrentUserProfileItemInView] = useState(null)

  return (
    <CurrentUserProfileItemInViewContext.Provider value={{contextUser: currentUserProfileItemInView, setCurrentUserProfileItemInView}}>
      <Navigator style={{backgroundColor:'red'}} initialRouteName="feedList" tabBar={() => <></>}>
        <Screen name="feedList" component={FeedScreen} initialParams={{profile: false}}/>
        <Screen name="feedProfile" component={ProfileScreen} initialParams={{initialUserId: null}}/>
      </Navigator>
    </CurrentUserProfileItemInViewContext.Provider>
  )
}

export default FeedNavigation