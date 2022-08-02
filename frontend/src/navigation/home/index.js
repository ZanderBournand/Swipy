import { View, Text, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native'
import React, {useCallback, useEffect, useMemo, useState, useContext} from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {SafeAreaView} from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Feather } from '@expo/vector-icons';
import SearchScreen from '../../screens/search';
import firebase from 'firebase'
import ChatScreen from '../../screens/chat/list'
import UploadScreen from '../../screens/upload/home'
import UploadNavigation from '../upload'
import FeedTestScreen from '../../screens/feedTest'
import NewFeedNavigation from '../newFeed'
import NewProfileScreen from '../../screens/newProfile'
import MessagesNavigation from '../messages'
import ProfileNavigation from "../profile"
import { useConnects } from '../../hooks/useConnects'
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import { IsAppLoadedContext } from '../../Context/AppLoaded'
import SearchNavigation from '../search'

const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen() {

  useConnects();

  return (
      <Tab.Navigator barStyle={{backgroundColor: '#030303', display: 'flex'}} initialRouteName="feed" keyboardHidesNavigationBar={Platform.OS == "ios" ? false : true}>
          <Tab.Screen 
              name="Feed" 
              component={NewFeedNavigation}
              options={{
                  tabBarIcon: ({color}) => (
                      <Feather name="home" size={24} color={color}/>
                  )
              }}
          />
          <Tab.Screen 
              name="Discover" 
              component={SearchNavigation}
              options={{
                  tabBarIcon: ({color}) => (
                      <Feather name="search" size={24} color={color}/>
                  )
              }}
          />
          <Tab.Screen 
              name="Upload" 
              component={UploadNavigation}
              options={{
                  tabBarIcon: ({color}) => (
                      <Feather name="plus-circle" size={24} color={color}/>
                  )
              }}
          />
          <Tab.Screen 
              name="Inbox" 
              component={MessagesNavigation}
              options={{
                  tabBarIcon: ({color}) => (
                      <Feather name="message-square" size={24} color={color}/>
                  )
              }}
          /> 
          <Tab.Screen 
              name="Me" 
              component={ProfileNavigation}
              options={{
                  tabBarIcon: ({color}) => (
                      <Feather name="user" size={24} color={color}/>
                  )
              }}
              initialParams={{initialUserId: firebase.auth().currentUser?.uid}}
          />
      </Tab.Navigator>
  )
}