import { View, Text } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import uploadBeat from '../../components/upload/uploadBeat'
import uploadSong from '../../components/upload/uploadSong'

const UploadType = createMaterialTopTabNavigator()

const UploadTypeNavigation = () => {

  const tabBarOptions = {
    indicatorStyle: {backgroundColor: '#FEACC6', width: '100%'},
  }
  

  return (
    <UploadType.Navigator style={{paddingTop: 15}} swipeEnabled={false} tabBarOptions={tabBarOptions}>
        <UploadType.Screen name="song" component={uploadSong}/>
        <UploadType.Screen name="beat" component={uploadBeat}/>
    </UploadType.Navigator>
  )
}

export default UploadTypeNavigation