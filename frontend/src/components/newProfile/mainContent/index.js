import { View, Text, TouchableOpacity, FlatList} from 'react-native'
import React, {useEffect, useState} from 'react'
import styles from './styles'
import { Feather, Entypo } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native"
import {getPopular, getPreview} from '../../../services/helpers'
import CachedImage from "react-native-expo-cached-image"

const ProfileWorks = ({work, user}) => {

  const [popularTracks, setPopularTracks] = useState(null)
  const [previewTracks, setPreviewTracks] = useState(null)

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

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Popular</Text>
        <View style={styles.popularTracksContainer}>
            {popularTracks != null ?    
                popularTracks.map((Object, index) => (
                    <View key={Object.title} style={styles.popularTrackContainer}>
                        <Text style={styles.popularTrackIndex}>{index}</Text>
                        <CachedImage style={styles.popularTrackImage} source={{uri: Object.media.artwork}}/>
                        <View style={styles.popularTrackInfo}>
                            <Text style={styles.popularTrackTitle}>{Object.title}</Text>
                            <Text style={styles.popularTrackType}>{Object.type}</Text>
                        </View>
                        <TouchableOpacity style={styles.popularTrackButton}>
                            <Feather name="heart" size={20} color="lightgray" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.popularTrackButton} >
                            <Entypo name="dots-three-horizontal" size={20} color="lightgray" />
                        </TouchableOpacity>
                    </View>
                ))
                :
                <Text style={{color: 'white'}}>LOADING...</Text>
            }
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionContainerHeader}> 
          <Text style={styles.sectionTitle}>Tracks</Text>
          <TouchableOpacity style={styles.showButton} onPress={() => navigation.navigate("showAllTracks", {user: user, work: work})}> 
            <Text style={styles.showButtonText}>Show all</Text>
          </TouchableOpacity>
        </View>
            {previewTracks != null ?
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
              <></>
            }
      </View>
    </View>
  )
}

export default ProfileWorks