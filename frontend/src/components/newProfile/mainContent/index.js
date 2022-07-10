import { View, Text, TouchableOpacity, FlatList} from 'react-native'
import React, {useEffect, useState, useMemo} from 'react'
import styles from './styles'
import { Feather, Entypo } from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons'
import {throttle} from 'throttle-debounce'
import {useNavigation} from "@react-navigation/native"
import {useSelector} from 'react-redux'
import {getPopular, getPreview} from '../../../services/helpers'
import CachedImage from "react-native-expo-cached-image"
import { getLikeByUpload, updateLike } from '../../../services/upload';

const ProfileWorks = ({work, user}) => {

  const [popularTracks, setPopularTracks] = useState(null)
  const [previewTracks, setPreviewTracks] = useState(null)

  const currentUser = useSelector((state) => state.auth.currentUser)

  const navigation = useNavigation()

  useEffect(() => {
    if (work != null) {
        setPopularTracks(getPopular(work))
        setPreviewTracks(getPreview(work))
    }
  }, [work])

  const renderItem = ({item}) => {
    return (
      <View style={styles.previewTrackContainer}>
        <CachedImage style={styles.previewTrackImage} source={{uri: item.media.artwork}}/>
        {/* <Text style={{color: 'gray'}}>{item.type}</Text> */}
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Text style={styles.previewTrackTitle}>{item.title}</Text>
          <Text style={{color: 'gray'}}>{item.type}</Text>
        </View>
      </View>
    )
  }

  const RenderPopularTrack = ({Object, index}) => {

    const [currentLikeState, setCurrentLikeState] = useState(false)

    useEffect(() => {
      if (Object != null) {
        getLikeByUpload(Object, currentUser.uid).then((res) => {
          setCurrentLikeState(res)
        })
        .catch((err) => {
          return
        })
      }
    }, [])

    const handleUpdateLike = useMemo(
      () =>
        throttle(500, (currentLikeStateInst) => {
          setCurrentLikeState(!currentLikeStateInst);
          updateLike(Object, currentUser.uid, currentLikeStateInst);
        }, {noTrailing: true}),
      [Object]
    );

    return (
      <View style={styles.popularTrackContainer}>
          <Text style={styles.popularTrackIndex}>{index + 1}</Text>
          <CachedImage style={styles.popularTrackImage} source={{uri: Object.media.artwork}}/>
          <View style={styles.popularTrackInfo}>
              <Text style={styles.popularTrackTitle}>{Object.title}</Text>
              <Text style={styles.popularTrackType}>{Object.type}</Text>
          </View>
          <TouchableOpacity style={styles.popularTrackButton} onPress={() => handleUpdateLike(currentLikeState)}>
          <Ionicons size={20} name={currentLikeState ? 'heart' :  'heart-outline'} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.popularTrackButton} >
              <Entypo name="dots-three-horizontal" size={20} color="lightgray" />
          </TouchableOpacity>
      </View>
    )
  }

  const RenderPopularTracks = () => {
    if (popularTracks.length != 0) {
      return (
        popularTracks.map((Object, index) => (
          <RenderPopularTrack key={Object.title} Object={Object} index={index}/>
        ))
      )
    }
    else {
      return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <Text style={{color: 'white', paddingTop: 25}}>NO DATA AVAILABLE</Text>
        </View>
      )
    }
  }

  const NoTracks = () => {
    if (previewTracks == null) {
      return (
        <></>
      )
    }
    else {
      return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <Text style={{color: 'white', paddingTop: 25}}>NO TRACKS UPLOADED</Text>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Popular</Text>
        <View style={styles.popularTracksContainer}>
            {popularTracks != null ?    
                <RenderPopularTracks />
                :
                <Text style={{color: 'white'}}>LOADING...</Text>
            }
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionContainerHeader}> 
          <Text style={styles.sectionTitle}>Tracks</Text>
          <TouchableOpacity style={styles.showButton} onPress={() => navigation.navigate("showAllTracks", {user: user, songs: work.get("songs"), beats: work.get("beats")})}> 
            <Text style={styles.showButtonText}>Show all</Text>
          </TouchableOpacity>
        </View>
            {previewTracks != null && previewTracks.length > 0 ?
              <FlatList 
                data={previewTracks}
                keyExtractor={item => item.title}
                horizontal={true}
                renderItem={renderItem}
                style={styles.previewTracksContainer}
                initialNumToRender={0}
                maxToRenderPerBatch={5}
                windowSize={5}
                removeClippedSubviews={true}
                decelerationRate={'normal'}
              />
              :
              <NoTracks />
            }
      </View>
    </View>
  )
}

export default ProfileWorks