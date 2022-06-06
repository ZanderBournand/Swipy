import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import UploadScreen from '../../screens/upload/home';
import UploadWorkScreen from '../../screens/upload/work';

const UploadStack = createStackNavigator()

const UploadNavigation = () => {

  return (
    <UploadStack.Navigator initialRouteName="homeUpload">
        <UploadStack.Screen name="homeUpload" component={UploadScreen} options={{headerShown: false}}/>
        <UploadStack.Screen name="workUpload" component={UploadWorkScreen} options={{headerShown: false}}/>
    </UploadStack.Navigator>
  )
}

export default UploadNavigation