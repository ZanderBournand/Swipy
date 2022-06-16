import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { useIsFocused } from '@react-navigation/core'
import NewFeedScreen from '../../screens/feedTest';

const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
    showIcon: true,
    showLabel: true,
    lazyLoad: true,
    style: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        position: 'absolute',
        left: 50,
        right: 50,
        height: 50,
        top: 50,
        marginHorizontal: 45,
    },
    indicatorStyle: {
        borderBottomWidth: 2,
        borderBottomColor: 'lightgray',
        opacity: 0.5,
        backgroundColor: 'transparent',
        flex: 1,
    },
    activeTintColor: 'white'
}

const emptyScreen = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>WAITING ON INPLEMENTATION</Text>
        </View>
    )
}

const NewFeedNavigation = () => {

  const isFocused = useIsFocused()

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
  
    return isFocused ? <StatusBar {...props} /> : null;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
        <FocusAwareStatusBar barStyle="light-content"/>
        <Tab.Navigator initialRouteName="Home" style={{width: '100%', backgroundColor: 'black'}} tabBarOptions={tabBarOptions} swipeEnabled={false}>
            <Tab.Screen name="Songs" component={NewFeedScreen} initialParams={{type: 'songs'}}/>
            <Tab.Screen name="Beats" component={NewFeedScreen} initialParams={{type: 'beats'}}/>
        </Tab.Navigator>
    </View>
  )
}

export default NewFeedNavigation