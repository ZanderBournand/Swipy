import { View, Text, StatusBar } from 'react-native'
import React, {useLayoutEffect} from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { useIsFocused } from '@react-navigation/core'
import NewFeedScreen from '../../screens/feedTest';
import {useSelector} from 'react-redux'
import FocusAwareStatusBar from '../../components/general/lightStatusBar'
import { useNavigation } from '@react-navigation/native'

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

  const navigation = useNavigation()

  const currentUser = useSelector(state => state.auth.currentUser)

  useLayoutEffect(() => {
    if(currentUser.displayName == null || currentUser.photoURL == null) {
      navigation.navigate('modalLogin')
    }
  }, [])

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