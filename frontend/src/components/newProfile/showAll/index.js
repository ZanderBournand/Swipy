import { View, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import {useNavigation} from "@react-navigation/native"
import { useDispatch, useSelector } from 'react-redux'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Feather} from '@expo/vector-icons'
import CachedImage from 'react-native-expo-cached-image'
import styles from './styles'
import {sortUploads} from "../../../services/helpers"
import { useIsFocused } from '@react-navigation/core'
import BestWorkItemBlack from '../../upload/bestWorkBlack'
import FocusAwareStatusBar from '../../general/lightStatusBar'
import { openPlayerModal } from '../../../redux/actions/playerModal'

const ShowAllTracks = ({route}) => {

  const {user, uploads} = route.params

  const playerState = useSelector(state => state.playerModal)

  const [workType, setWorkType] = useState("song")
  const [data, setData] = useState(null)

  const workSorted = sortUploads(uploads)

  const navigation = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (workSorted != null) {
      if (workType + "s" == "songs") {
        setData(workSorted.songs)
      }
      else {
        setData(workSorted.beats)
      }
    }
  }, [workSorted, workType])

  const renderItem = ({item, index}) => {
    return (
        <View style={{paddingVertical: 0, paddingLeft: 20}}>
          <TouchableWithoutFeedback onPress={() => {
            dispatch(openPlayerModal({
              user: user?.displayName,
              list: data,
              index: index,
              track: item
            }))
          }}>
            <View>
              <BestWorkItemBlack item={item} />
            </View>
          </TouchableWithoutFeedback>
        </View>
    )
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <SafeAreaView style={{backgroundColor: '#121212', height: '100%'}} edges={['top', 'left', 'right']}>
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
          contentContainerStyle={{paddingBottom: (playerState?.open) ? Dimensions.get('window').height * 0.08 : Dimensions.get('window').height * 0.04}}
        />
        :
        <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 20,}}>
          <Text style={{color: 'lightgray'}}>No {capitalizeFirstLetter(workType) + "s"} Available</Text>
        </View>
      }

    </SafeAreaView>
  )
}

export default ShowAllTracks