import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, ScrollView, StatusBar} from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Feather} from '@expo/vector-icons'
import styles from './styles'
import {useSelector} from "react-redux"
import CachedImage from 'react-native-expo-cached-image'
import {useNavigation} from "@react-navigation/native"
import BestWorkItem from '../../../components/upload/bestwork'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getBeats, getSongsByUserId, getSongs, getAllSongsByUserId} from '../../../services/upload'
import { useUploads } from '../../../hooks/useUploads'
import {getTrending} from "../../../services/helpers"
import FocusAwareStatusBar from '../../../components/general/lightStatusBar'

const UploadScreen = () => {

  const windowHeight = Dimensions.get('window').height;

  const currentUser = useSelector(state => state.auth.currentUser)
  const navigation = useNavigation()
  const [trendings, setTrendings] = useState(null)

  const uploads = useUploads(currentUser?.uid).data

  useEffect(() => {
    if(uploads != null) {
        setTrendings(getTrending(uploads))
    }
  }, [uploads])
  
  const TrackCount = () => {
      return (
        <View style={styles.tracks}>
            <View style={styles.trackCount}>
                <Text style={{fontFamily: 'inter_bold', fontSize: 22, color: 'white'}}>
                    My Tracks 
                    <Text style={{fontFamily: 'inter_extra_light'}}> (</Text>
                    <Text style={{fontFamily: 'inter_bold'}}>{currentUser?.workCount}</Text>
                    <Text style={{fontFamily: 'inter_extra_light'}}>)</Text>
                </Text>
            </View>
            <View>
                <TouchableOpacity style={styles.allTracksButton} onPress={() => {navigation.navigate('myTracks')}}>
                    <Text style={{fontWeight: '600', fontSize: 15, color: 'white'}}>See All</Text>
                </TouchableOpacity>
            </View>
        </View>
      )
  }

  const TrendingItems = () => {
    if (trendings.length == 2) {
        return (
            <>
            <View style={[styles.subContainer, {flex: 3}]}>
                <Text style={{fontFamily: 'inter_bold', fontSize: 22, color: 'white'}}>Your Trending Sounds</Text>
                <View style={{paddingTop: 10, flex: 1}}>
                    <BestWorkItem item={trendings[0]}/>
                    <BestWorkItem item={trendings[1]}/>
                </View>
            </View>
            <TrackCount/>
            </>
        )
    }
    else if (trendings.length == 1) {
        return (
            <>
            <View style={[styles.subContainer, {flex: 2, paddingTop: 10}]}>
                <Text style={{fontFamily: 'inter_bold', fontSize: 22, color: 'white'}}>Your Trending Sounds</Text>
                <View style={{height: '65%', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                    <BestWorkItem item={trendings[0]}/>
                </View>
            </View>
            <TrackCount/>
            <View style={{flex: 1}}>
                <Text></Text>
            </View>
            </>
        )
    }
    else {
        return (
            <>
            <View style={[styles.subContainer, {flex: 1.5, paddingTop: 10}]}>
                <Text style={{fontFamily: 'inter_bold', fontSize: 22, color: 'white'}}>Your Trending Sounds</Text>
                <View style={{height: '65%', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>No Data Available</Text>
                </View>
            </View>
            <TrackCount/>
            <View style={{flex: 1}}>
                <Text></Text>
            </View>
            </>
        )
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
        <FocusAwareStatusBar barStyle="light-content"/>
        <KeyboardAwareScrollView contentContainerStyle={{flex:1}}>
            <View style={styles.topContainer}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => {navigation.navigate("workUpload")}}>
                        <Feather name="arrow-up" size={30} color="lightgray" />
                    </TouchableOpacity>
                    <Text style={[styles.title, {fontFamily: 'inter_black', fontSize: 30}]}>Upload</Text>
                </View>
                <TouchableOpacity style={styles.profileContainer} onPress={() => {navigation.navigate("Me")}}>
                    <CachedImage style={styles.profileImage} source={{uri: currentUser?.photoURL}} />
                </TouchableOpacity>
            </View>

            <View style={styles.uploadContainer}>
                <View style={styles.left}>
                    <Text style={{fontFamily: 'inter_bold', fontSize: 18, paddingLeft: 20, paddingTop: 10}}>New Song / Beat</Text>
                    <Text style={{fontFamily: 'inter_medium', paddingLeft: 20, paddingTop: 10}}>Upload your work and start collaborating with others!</Text>
                    <View style={{paddingLeft: 20, paddingTop: 20, paddingBottom: 20}}>
                        <TouchableOpacity style={styles.uploadButton} onPress={() => {navigation.navigate("workUpload")}}>
                            <Feather name="upload-cloud" size={28} color="white" />
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.right}>
                    <Image source={require('../../../../assets/Swipy_Left_B.png')}/>
                </View>
            </View>

            {trendings != null ?
                <TrendingItems/>
                :
                <></>
            }

        </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default UploadScreen