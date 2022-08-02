import { View, Text, Animated, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import React, {useEffect, useState, useMemo, useContext, useCallback} from 'react'
import { userAuthStateListener } from '../../redux/actions';
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AuthScreen from '../../screens/auth';
import HomeScreen from '../home';
import EditProfileScreen from '../../screens/newProfile/edit';
import EditProfileFieldScreen from '../../screens/newProfile/edit/field';
import Modal from '../../components/modal';
import ChatSingleScreen from '../../screens/chat/single';
import ModalScreen from '../../screens/modal';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerScreen from '../../screens/drawer';
import ShowAllTracks from '../../components/newProfile/showAll';
import NewProfileScreen from '../../screens/newProfile';
import PopUp from '../../components/popup';
import FeedModal from '../../components/feedModal';
import PlayerModal from '../../components/playerModal';
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import { IsAppLoadedContext } from '../../Context/AppLoaded';

const Stack = createStackNavigator()
const Stack2 = createStackNavigator()
const Drawer = createDrawerNavigator()

const Test = () => {
  return (
    <>
      <Stack2.Navigator mode="card">
        <Stack.Screen name="home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="editProfile" component={EditProfileScreen} options={{headerShown: false}} />
        <Stack.Screen name="editProfileField" component={EditProfileFieldScreen} options={{headerShown: false}} />
        <Stack.Screen name="chatSingle" component={ChatSingleScreen} options={{headerShown: false}} />
      </Stack2.Navigator>
      <PopUp/>
      <FeedModal/>
      <PlayerModal />
    </>
  )
}

const Test2 = () => {
  return (
    <Drawer.Navigator 
      screenOptions={{swipeEnabled: false}} 
      drawerPosition="right" 
      drawerContent={props => <DrawerScreen {...props}/> }
      drawerStyle={{width: '60%'}}
    >
      <Drawer.Screen name="wow" component={Test}/>
    </Drawer.Navigator>
  )
}

export default function Route() {
  const currentUserObj = useSelector(state => state.auth)

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(userAuthStateListener());
  }, [])

  if(!currentUserObj.loaded) {
      return (
          <View></View>
      )
  }

  return (
    <AnimatedSplashScreen>
      <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator mode="modal" screenOptions={{cardOverlayEnabled: true, ...TransitionPresets.ModalPresentationIOS}}>
              {currentUserObj.currentUser == null ?       
                  <Stack.Screen name="auth" component={AuthScreen} options={{headerShown: false, ...TransitionPresets.SlideFromRightIOS}} />
                  :
                  <>
                    <Stack.Screen name="nav" component={Test2} options={{headerShown: false, ...TransitionPresets.DefaultTransition}} />
                    <Stack.Screen name="modalLogin" component={ModalScreen} options={{headerShown: false}}/>
                  </>
              }
          </Stack.Navigator>
          <Modal/>
      </NavigationContainer>
    </AnimatedSplashScreen>
  )

}

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