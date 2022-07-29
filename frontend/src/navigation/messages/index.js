import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import ChatScreen from '../../screens/chat/list';
import InvitationsScreen from '../../screens/chat/invitations';
import NewProfileScreen from '../../screens/newProfile';
import ChatSingleScreen from '../../screens/chat/single';
import { useDispatch } from 'react-redux';
import { clearPlayerModal } from '../../redux/actions/playerModal';
import ShowAllTracks from '../../components/newProfile/showAll';

const MessagesStack = createStackNavigator()
const ProfileStack = createStackNavigator()

const MessagesNavigation = ({}) => {

  return (
    <MessagesStack.Navigator initialRouteName="homeMessage">
        <MessagesStack.Screen name="homeMessage" component={ChatScreen} options={{headerShown: false}}/>
        <MessagesStack.Screen name="invitations" component={InvitationsScreen} options={{headerShown: false}}/>
        <MessagesStack.Screen name="profile" component={SearchedProfileNavigation} options={{headerShown: false}}/>
        <MessagesStack.Screen name="chatSingle" component={ChatSingleScreen} options={{headerShown: false}} />
    </MessagesStack.Navigator>
  )
}

const SearchedProfileNavigation = () => {

  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  useEffect(() => {
      if (!isFocused) {
          dispatch(clearPlayerModal())
      }
  }, [isFocused])

  return (
      <ProfileStack.Navigator initialRouteName="profileOther">
          <ProfileStack.Screen name="profileOther" component={NewProfileScreen} options={{headerShown: false}}/>
          <ProfileStack.Screen name="showAllTracks" component={ShowAllTracks} options={{headerShown: false}}/>
      </ProfileStack.Navigator>
  )
}

export default MessagesNavigation