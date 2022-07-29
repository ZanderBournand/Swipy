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
import { useUploadsNew } from '../../hooks/useUploadsNew'
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import { IsAppLoadedContext } from '../../Context/AppLoaded'
import SearchNavigation from '../search'

SplashScreen.preventAutoHideAsync().catch(() => {});

function AnimatedSplashScreen({children}) {

    const animation = useMemo(() => new Animated.Value(1), []);
    const [isAppReady, setAppReady] = useState(false);
    const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

    const {isAppLoaded} = useContext(IsAppLoadedContext)

    useEffect(() => {
        if (isAppReady) {
          Animated.timing(animation, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start(() => setAnimationComplete(true));
        }
    }, [isAppReady]);

    useEffect(() => {
        if (isAppLoaded) {
            onImageLoaded()
        }
    }, [isAppLoaded])

    const onImageLoaded = useCallback(async () => {
        try {
          await SplashScreen.hideAsync();
          // Load stuff
          await Promise.all([]);
        } catch (e) {
          // handle errors
        } finally {
          setAppReady(true);
        }
    }, []);


    return (
        <View style={{ flex: 1 }}>
          {children}
          {!isSplashAnimationComplete && (
            <Animated.View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: '#121212',
                  opacity: animation,
                },
              ]}
            >
              <></>
            </Animated.View>
          )}
        </View>
      );

}

const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen() {

  useConnects();
  useUploadsNew()

  return (
    <AnimatedSplashScreen>
        <Tab.Navigator barStyle={{backgroundColor: '#030303'}} initialRouteName="feed">
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
    </AnimatedSplashScreen>
  )
}