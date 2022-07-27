import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, TouchableWithoutFeedback} from 'react-native'
import React, {useEffect, useState, useMemo, useContext} from 'react'
import styles from './styles'
import { Feather, Entypo } from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons'
import {throttle} from 'throttle-debounce'
import {useNavigation} from "@react-navigation/native"
import {useSelector} from 'react-redux'
import {getPopular, getPreview} from '../../../services/helpers'
import { getLikeByUpload, updateLike } from '../../../services/upload';
import PopularTrack from '../mainContent/popularTrack'
import { useDispatch } from 'react-redux'
import {openPlayerModal} from '../../../redux/actions/playerModal'
import { ProfileCurrentTrackInViewContext } from '../../../Context/ProfileTrackContext';
import LottieView from 'lottie-react-native'
import PreviewTrack from './previewTrack';

const ProfileWorks = ({work, user}) => {

  const [popularTracks, setPopularTracks] = useState(null)
  const [previewTracks, setPreviewTracks] = useState(null)

  const navigation = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (work != null) {
        setPopularTracks(getPopular(work))
        setPreviewTracks(getPreview(work))
    }
  }, [work])

  const renderItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback onPress={() => {
        dispatch(openPlayerModal({
          user: user?.displayName,
          list: previewTracks,
          index: index,
          track: item
        }))
      }}>
        <View>
          <PreviewTrack item={item}/>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const RenderPopularTracks = () => {
    if (popularTracks.length != 0) {
      return (
        popularTracks.map((Object, index) => (
          <TouchableWithoutFeedback key={Object.title} onPress={() => {
            dispatch(openPlayerModal({
              user: user?.displayName,
              list: popularTracks,
              index: index,
              track: Object
            }))
          }}>
            <View>
              <PopularTrack Object={Object} index={index}/>
            </View>
          </TouchableWithoutFeedback>
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
      {popularTracks == null || previewTracks == null ?
        <View style={styles.loader}>
          <ActivityIndicator size="small" color="lightgray"/>
        </View>
        :
        <>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Popular</Text>
            <View style={styles.popularTracksContainer}>
              <RenderPopularTracks />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionContainerHeader}> 
              <Text style={styles.sectionTitle}>Tracks</Text>
              <TouchableOpacity style={styles.showButton} onPress={() => navigation.navigate("showAllTracks", {user: user, uploads: work})}> 
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
          <View style={styles.bottomSpacing}>
            <></>
          </View>
        </>
      }
    </View>
  )
}

export default ProfileWorks