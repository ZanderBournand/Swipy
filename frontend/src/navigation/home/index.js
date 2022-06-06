import { View, Text, TouchableOpacity } from 'react-native'
import React, {createContext, useState} from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {SafeAreaView} from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { Feather } from '@expo/vector-icons';
import CameraScreen from '../../screens/camera';
import ProfileScreen from '../../screens/profile';
import SearchScreen from '../../screens/search';
import FeedScreen from '../../screens/feed';
import FeedNavigation from '../feed';
import firebase from 'firebase'
import ChatScreen from '../../screens/chat/list'
import { useChats } from '../../hooks/useChats'
import UploadScreen from '../../screens/upload/home'
import UploadNavigation from '../upload'

const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen() {

  useChats();

  return (
    <Tab.Navigator barStyle={{backgroundColor: 'black'}} initialRouteName="feed">
        <Tab.Screen 
            name="feed" 
            component={FeedNavigation}
            options={{
                tabBarIcon: ({color}) => (
                    <Feather name="home" size={24} color={color}/>
                )
            }}
        />
        <Tab.Screen 
            name="Discover" 
            component={SearchScreen}
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
            component={ChatScreen}
            options={{
                tabBarIcon: ({color}) => (
                    <Feather name="message-square" size={24} color={color}/>
                )
            }}
        /> 
        <Tab.Screen 
            name="Me" 
            component={ProfileScreen}
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