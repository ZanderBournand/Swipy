import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import firebase from 'firebase'
import NewProfileScreen from '../../screens/newProfile';
import ShowAllTracks from '../../components/newProfile/showAll';
import { useIsFocused } from '@react-navigation/core'
import {useDispatch, useSelector} from 'react-redux'
import { clearPlayerModal } from '../../redux/actions/playerModal';

const ProfileStack = createStackNavigator()

const ProfileNavigation = () => {

    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isFocused) {
            dispatch(clearPlayerModal())
        }
    }, [isFocused])

    return (
        <ProfileStack.Navigator initialRouteName="profileDefault">
            <ProfileStack.Screen name="profileDefault" component={NewProfileScreen} options={{headerShown: false}} initialParams={{initialUserId: firebase.auth().currentUser?.uid}}/>
            <ProfileStack.Screen name="showAllTracks" component={ShowAllTracks} options={{headerShown: false}}/>
        </ProfileStack.Navigator>
    )
}

export default ProfileNavigation
