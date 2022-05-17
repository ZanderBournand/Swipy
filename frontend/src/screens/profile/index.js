import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import styles from './styles'
import ProfileNavBar from '../../components/profile/navBar'
import ProfileHeader from '../../components/profile/header'
import ProfilePostList from '../../components/profile/postList'

export default function ProfileScreen() {

  const currentUser = useSelector(state => state.auth.currentUser)
  const currentUserPosts = useSelector(state => state.posts.currentUserPosts)

  return (
    <View style={styles.container}>
      <ProfileNavBar user={currentUser}/>
      <ProfileHeader user={currentUser}/>
      <ProfilePostList posts={currentUserPosts}/>
    </View>
  )
}