import { View, Text } from 'react-native'
import React, {useContext, useEffect, useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import styles from './styles'
import ProfileNavBar from '../../components/profile/navBar'
import ProfileHeader from '../../components/profile/header'
import ProfilePostList from '../../components/profile/postList'
import {SafeAreaView} from 'react-native-safe-area-context'
import { CurrentUserProfileItemInViewContext } from '../../Context/UserContext'
import { useIsFocused } from '@react-navigation/core'
import { useUser } from '../../hooks/useUser'
import { usePosts } from '../../hooks/usePosts'
import { getPostsByUserId } from '../../services/posts'

export default function ProfileScreen({route}) {

  const [userPosts, setUserPosts] = useState([])
  const {initialUserId, searched} = route.params;

  const { contextUser } = useContext(CurrentUserProfileItemInViewContext)

  const user = useUser(initialUserId ? initialUserId : contextUser).data

  const userPostsTest = usePosts(user?.uid).data

  useEffect(() => {
    if(user === undefined) {
      return;
    }
  }, [user])

  return (
    <View style={styles.container}>
      <ProfileNavBar user={user} searched={searched != null ? searched : false}/>
      <ProfileHeader user={user}/>
      <ProfilePostList posts={userPostsTest}/>
    </View>
  )
}