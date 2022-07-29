import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import SearchScreen from '../../screens/search';
import NewProfileScreen from '../../screens/newProfile';
import ShowAllTracks from '../../components/newProfile/showAll';
import { useDispatch } from 'react-redux';
import { clearPlayerModal } from '../../redux/actions/playerModal';

const SearchStack = createStackNavigator()
const ProfileStack = createStackNavigator()

const SearchNavigation = () => {
  return (
    <SearchStack.Navigator initialRouteName="search">
        <SearchStack.Screen name="search" component={SearchScreen} options={{headerShown: false}}/>
        <SearchStack.Screen name="profile" component={SearchedProfileNavigation} options={{headerShown: false}}/>
    </SearchStack.Navigator>
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

export default SearchNavigation