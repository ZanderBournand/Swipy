import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import ChatScreen from '../../screens/chat/list';
import InvitationsScreen from '../../screens/chat/invitations';

const MessagesStack = createStackNavigator()

const MessagesNavigation = () => {
  return (
    <MessagesStack.Navigator initialRouteName="homeMessage">
        <MessagesStack.Screen name="homeMessage" component={ChatScreen} options={{headerShown: false}}/>
        <MessagesStack.Screen name="invitations" component={InvitationsScreen} options={{headerShown: false}}/>
    </MessagesStack.Navigator>
  )
}

export default MessagesNavigation