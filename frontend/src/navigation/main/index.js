import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import React, {useEffect} from 'react'
import { userAuthStateListener } from '../../redux/actions';
import { NavigationContainer } from '@react-navigation/native'
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

const Stack = createStackNavigator()
const Stack2 = createStackNavigator()
const Drawer = createDrawerNavigator()

const Test = () => {
  return (
    <>
      <Stack2.Navigator mode="card">
        <Stack.Screen name="home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="profileOther" component={NewProfileScreen} options={{headerShown: false}} />
        <Stack.Screen name="editProfile" component={EditProfileScreen} options={{headerShown: false}} />
        <Stack.Screen name="showAllTracks" component={ShowAllTracks} options={{headerShown: false}} />
        <Stack.Screen name="editProfileField" component={EditProfileFieldScreen} options={{headerShown: false}} />
        <Stack.Screen name="chatSingle" component={ChatSingleScreen} options={{headerShown: false}} />
      </Stack2.Navigator>
      <PopUp/>
      <FeedModal/>
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
    <NavigationContainer>
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
  )

}