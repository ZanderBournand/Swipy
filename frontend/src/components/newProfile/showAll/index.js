import { View, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import React, {useState, useEffect} from 'react'
import {useNavigation} from "@react-navigation/native"
import {SafeAreaView} from 'react-native-safe-area-context'
import {Feather} from '@expo/vector-icons'
import CachedImage from 'react-native-expo-cached-image'
import styles from './styles'
import {sortUploads} from "../../../services/helpers"
import { useIsFocused } from '@react-navigation/core'
import BestWorkItemBlack from '../../upload/bestWorkBlack'

const ShowAllTracks = ({route}) => {

  const {user, songs, beats} = route.params

  const [workType, setWorkType] = useState("song")
  const [data, setData] = useState(null)

  const workSorted = sortUploads(new Map([["songs", songs], ["beats", beats]]))

  const navigation = useNavigation()

  useEffect(() => {
    if (workSorted != null) {
      setData(workSorted.get(workType + "s"))
    }
  }, [workSorted, workType])

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

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
  
    return isFocused ? <StatusBar {...props} /> : null;
  }

  return (
    <SafeAreaView style={{backgroundColor: 'black', height: '100%'}}>
      <FocusAwareStatusBar barStyle="light-content"/>
      
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Feather name="arrow-left" size={30} color="lightgray" />
            </TouchableOpacity>
            <Text style={[styles.title, {fontFamily: 'inter_black', fontSize: 28, color: 'lightgray'}]}>All Tracks</Text>
        </View>
        <View style={styles.profileContainer}>
            <CachedImage style={styles.profileImage} source={{uri: user?.photoURL}} />
        </View>
      </View>

      <View style={styles.typeContainer}>
        <TouchableOpacity style={styles.typeButton} onPress={() => {setWorkType('song')}}>
          <Text style={(workType === 'song' ? styles.typeSelected : styles.typeNotSelected)}>
            Songs
          </Text>
          {workType === 'song' ? <View style={styles.indicator}/> : <></>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeButton}  onPress={() => {setWorkType('beat')}}>
          <Text style={(workType === 'beat' ? styles.typeSelected : styles.typeNotSelected)}>
            Beats
          </Text>
          {workType === 'beat' ? <View style={styles.indicator}/> : <></>}
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
          <Text>No {capitalizeFirstLetter(workType) + "s"} Available</Text>
        </View>
      }

    </SafeAreaView>
  )
}

export default ShowAllTracks