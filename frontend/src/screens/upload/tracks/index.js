import { View, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './styles'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from "@react-navigation/native"
import {useSelector} from "react-redux"
import CachedImage from 'react-native-expo-cached-image'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BestWorkItem from '../../../components/upload/bestwork'
import { useUploads } from '../../../hooks/useUploads'
import {sortUploads} from "../../../services/helpers"
import FocusAwareStatusBar from '../../../components/general/lightStatusBar'
import BestWorkItemBlack from '../../../components/upload/bestWorkBlack'

const MyTracksScreen = ({route}) => {

  const {allUploads} = route.params
  
  const currentUser = useSelector(state => state.auth.currentUser)
  const navigation = useNavigation()

  const [uploadType, setUploadType] = useState("song")
  const [data, setData] = useState(null)

  const uploads = sortUploads(allUploads)

  useEffect(() => {
    if (uploads != null) {
      if (uploadType + "s" == "songs") {
        setData(uploads.songs)
      }
      else {
        setData(uploads.beats)
      }
    }
  }, [uploads, uploadType])

  const renderItem = ({item}) => {
    return (
        <View style={{paddingVertical: 0, paddingLeft: 20}}>
          <BestWorkItemBlack item={item} />
        </View>
    )
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content"/>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Feather name="arrow-left" size={30} color="lightgray" />
            </TouchableOpacity>
            <Text style={[styles.title, {fontFamily: 'inter_black', fontSize: 28, color: 'lightgray'}]}>My Tracks</Text>
        </View>
        <TouchableOpacity style={styles.profileContainer} onPress={() => {navigation.navigate("Me")}}>
            <CachedImage style={styles.profileImage} source={{uri: currentUser?.photoURL}} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.typeContainer}>
        <TouchableOpacity style={styles.typeButton} onPress={() => {setUploadType('song')}}>
          <Text style={(uploadType === 'song' ? styles.typeSelected : styles.typeNotSelected)}>
            Songs
          </Text>
          {uploadType === 'song' ? <View style={styles.indicator}/> : <></>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeButton}  onPress={() => {setUploadType('beat')}}>
          <Text style={(uploadType === 'beat' ? styles.typeSelected : styles.typeNotSelected)}>
            Beats
          </Text>
          {uploadType === 'beat' ? <View style={styles.indicator}/> : <></>}
        </TouchableOpacity>
      </View>

      {data != null && data.length > 0?
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          removeClippedSubviews
        />
        :
        <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 20,}}>
          <Text>No {capitalizeFirstLetter(uploadType) + "s"} Available</Text>
        </View>
      }

    </SafeAreaView>
  )
}

export default MyTracksScreen