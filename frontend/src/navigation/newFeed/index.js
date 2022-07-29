import { View, Text, StatusBar } from 'react-native'
import React, {useLayoutEffect, useEffect} from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/core'
import NewFeedScreen from '../../screens/feedTest';
import {useDispatch, useSelector} from 'react-redux'
import FocusAwareStatusBar from '../../components/general/lightStatusBar'
import { useNavigation } from '@react-navigation/native'
import NewProfileScreen from '../../screens/newProfile';
import ShowAllTracks from '../../components/newProfile/showAll';
import { clearPlayerModal } from '../../redux/actions/playerModal';

const Tab = createMaterialTopTabNavigator();
const FeedStack = createStackNavigator()
const ProfileStack = createStackNavigator()

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

const NewFeedNavigation = () => {

  const isFocused = useIsFocused()

  const navigation = useNavigation()

  const currentUser = useSelector(state => state.auth.currentUser)

  useLayoutEffect(() => {
    if(currentUser?.displayName == null || currentUser?.photoURL == null) {
      navigation.navigate('modalLogin')
    }
  }, [])

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
        <FocusAwareStatusBar barStyle="light-content"/>
        <FeedStack.Navigator>
          <FeedStack.Screen name="feed" component={FeedScreenNavigation} options={{headerShown: false}}/>
          <FeedStack.Screen name="profile" component={FeedProfileNavigation} options={{headerShown: false}}/>
        </FeedStack.Navigator>
    </View>
  )
}

const FeedScreenNavigation = () => {

  return (
    <Tab.Navigator initialRouteName="Home" style={{width: '100%', backgroundColor: 'black'}} tabBarOptions={tabBarOptions} swipeEnabled={false}>
        <Tab.Screen name="Songs" component={NewFeedScreen} initialParams={{type: 'songs'}}/>
        <Tab.Screen name="Beats" component={NewFeedScreen} initialParams={{type: 'beats'}}/>
    </Tab.Navigator>
  )
}

const FeedProfileNavigation = () => {

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

export default NewFeedNavigation