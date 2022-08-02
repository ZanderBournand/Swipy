import { View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, StatusBar } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFonts, Inter_900Black, Inter_500Medium, Inter_700Bold, Inter_300Light, Inter_100Thin, Inter_200ExtraLight, Inter_800ExtraBold} from '@expo-google-fonts/inter';
import {Feather} from '@expo/vector-icons'
import styles from './styles'
import CachedImage from 'react-native-expo-cached-image'
import {useNavigation} from "@react-navigation/native"
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import {useSelector} from "react-redux"
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker'
import * as VideoThumbnails from 'expo-video-thumbnails';
import { createUpload } from '../../../services/upload';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FocusAwareStatusBar from '../../../components/general/lightStatusBar';
import { useUploadsMutation } from '../../../hooks/useUploadsMutation';
import { useUploads } from '../../../hooks/useUploads';

const UploadWorkScreen = () => {

  const currentUser = useSelector(state => state.auth.currentUser)
  const uploads = useUploads(currentUser?.uid)

  const mutateUploads = useUploadsMutation()

  const [uploadType, setUploadType] = useState("song")
  const [artworkUpload, setArtworkUpload] = useState(false)
  const [audioUpload, setAudioUpload] = useState(false)
  const [displayType, setDisplayType] = useState(null)

  const [artwork, setArtwork] = useState(null)
  const [video, setVideo] = useState(null)
  const [audio, setAudio] = useState(null)
  const [title, setTitle] = useState('')

  const [requestRunning, setRequestRunning] = useState(false)

  const incompleteUpload = !title || artwork == null || audio == null

  const navigation = useNavigation()

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_800ExtraBold
  });
    
  if (!fontsLoaded) {
    return <></>;
  }

  const pickAudioFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: '*/*'
    })
    if (result.type != "cancel") {
      setAudio(result)
    }
  }

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: (displayType == 'video' ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images),
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
    })
    if(!result.cancelled){
      if (displayType == 'video') {
        setVideo(result)
        let videoThumbnail = await generateThumbnail(result.uri)
        setArtwork(videoThumbnail)
      }
      else {
        setArtwork(result.uri)
      }
    }
  }

  const generateThumbnail = async (source) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        source,
        {
          time: 0,
        }
      );
      return uri;
    } catch (e) {
      console.warn(e);
    }
  }

  const handleSaveUpload = () => {
    setRequestRunning(true)
    createUpload(uploadType, title, audio.uri, video?.uri, artwork)
      .then((res) => {
          
          let newUploads = uploads 
          const newTrack = res

          if (res.type == 'song') {
            newUploads.songs = [...newUploads.songs, res]
          }
          else if (res.type == 'beat') {
            newUploads.beats = [...newUploads.beats, res]
          }
          mutateUploads.mutate({user: currentUser?.uid, newUploads: newUploads})
          navigation.goBack()
      })
      .catch(() => setRequestRunning(false))
  }

  if(requestRunning){
    return (
      <View style={styles.uploadingContainer}>
          <ActivityIndicator color='#fd7aa3' size='large'/>
      </View> 
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content"/>
      <KeyboardAwareScrollView contentContainerStyle={{flex:1}}>
        <View style={styles.topContainer}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Feather name="arrow-left" size={30} color="lightgray" />
                </TouchableOpacity>
                <Text style={[styles.title, {fontFamily: 'Inter_900Black', fontSize: 28}]}>Add Work</Text>
            </View>
            <TouchableOpacity style={styles.profileContainer} onPress={() => {navigation.navigate("Me")}}>
                <CachedImage style={styles.profileImage} source={{uri: currentUser?.photoURL}} />
            </TouchableOpacity>
        </View>

        <View style={styles.typeContainer}>
          <TouchableOpacity style={styles.typeButton} onPress={() => {setUploadType('song')}}>
            <Text style={(uploadType === 'song' ? styles.typeSelected : styles.typeNotSelected)}>
              Song
            </Text>
            {uploadType === 'song' ? <View style={styles.indicator}/> : <></>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.typeButton}  onPress={() => {setUploadType('beat')}}>
            <Text style={(uploadType === 'beat' ? styles.typeSelected : styles.typeNotSelected)}>Beat</Text>
            {uploadType === 'beat' ? <View style={styles.indicator}/> : <></>}
          </TouchableOpacity>
        </View>

        <View style={styles.uploadFilesContainer}>
          {displayType == null ?
            <View style={styles.fileTypeUploadContainerTop}>
              <View style={styles.artOrVideoContainer}>
                <TouchableOpacity style={styles.artOrVideoButton} onPress={() => {setDisplayType('video')}}>
                  <Text style={[styles.artOrVideoText, {fontFamily: 'Inter_800ExtraBold'}]}>Short Video</Text>
                </TouchableOpacity>
                <Text style={{color: '#868686'}}>or</Text>
                <TouchableOpacity style={styles.artOrVideoButton} onPress={() => {setDisplayType('artwork')}}>
                  <Text style={[styles.artOrVideoText, {fontFamily: 'Inter_800ExtraBold'}]}>Artwork</Text>
                </TouchableOpacity>
              </View>
            </View>
            :
            <>
            {artwork == null ?
              <TouchableOpacity style={styles.fileTypeUploadContainerTop} onPress={() => {pickFromGallery()}}>
                <View style={styles.fileIconContainer}>
                  <View style={styles.fileIcon}>
                    {displayType == 'video' ?
                      <FontAwesome5 name="photo-video" size={27} color="black" />
                      :
                      <MaterialIcons name="add-photo-alternate" size={29} color="black" />
                    }
                  </View>
                </View>
                <View style={styles.fileUploadDescription}>
                  <View style={{paddingLeft: 10, paddingVertical: 30}}>
                    <Text style={{color: '#F0F0F0', fontFamily: 'Inter_700Bold', fontSize: 16}}>
                      Upload {(displayType == 'video') ? "Video" : "Artwork"}
                    </Text>
                    <Text style={{color: '#868686', fontSize: 12, paddingTop: 10}}>
                      {(displayType == 'video') ? "Length < 10 seconds" : "Aspect Ratio Square - 1:1"}
                    </Text>
                    <Text style={{color: '#868686', fontSize: 12}}>
                      Format {(displayType == 'video') ? "MP4, MOV, WMV" : "JPG, PNG, JPEG 2000"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              :
              <View style={styles.fileTypeUploadContainerTopModified}>
                <View style={styles.previewContainer}>
                  <Image style={styles.mediaPreview} source={{uri: artwork}}/>
                </View>
                <TouchableOpacity style={styles.editButtonContainer} onPress={() => {pickFromGallery()}}>
                  <Feather name="edit" size={40} color="black" />
                </TouchableOpacity>
              </View>
            }
            </>
          }

          {audio == null ?
            <TouchableOpacity style={styles.fileTypeUploadContainerBottom} onPress={() => pickAudioFile()}>
              <View style={styles.fileIconContainer}>
                <View style={styles.fileIcon}>
                  <MaterialCommunityIcons name="music-note-plus" size={30} color="black" />
                </View>
              </View>
              <View style={styles.fileUploadDescription}>
                <View style={{paddingLeft: 10, paddingVertical: 30}}>
                  <Text style={{color: '#F0F0F0', fontFamily: 'Inter_700Bold', fontSize: 16}}>Upload Audio</Text>
                  <Text style={{color: '#868686', fontSize: 12, paddingTop: 10}}>{"Length < 5min"}</Text>
                  <Text style={{color: '#868686', fontSize: 12}}>Format MP3, MP4, WAV, FLAC</Text>
                </View>
              </View>
            </TouchableOpacity>
            :
            <View style={styles.fileTypeUploadContainerBottomModified}>
              <View style={styles.audioDetailsContainer}>
                <Feather name="music" size={26} color="black"/>
                <Text style={{fontWeight: 'bold', paddingVertical: 10, textAlign: 'center'}}>{audio.name}</Text>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Size: {parseFloat((audio.size / 1000000).toFixed(2))} MB</Text>
              </View>
              <TouchableOpacity style={styles.editButtonContainer} onPress={() => pickAudioFile()}>
                <Feather name="edit" size={40} color="black" />
              </TouchableOpacity>
            </View>
          }
          
        </View>

        <View style={styles.trackInformationContainer}>
          <View style={styles.trackInformationTitle}>
            <Text style={{fontFamily: 'Inter_700Bold', fontSize: 22, color: 'white'}}>Track Information</Text>
            <TouchableOpacity style={styles.moreIconContainer}>
              <MaterialCommunityIcons name="unfold-more-horizontal" size={30} color="lightgray" />
            </TouchableOpacity>
          </View>
          <Text style={{color: 'lightgray', paddingTop: 8, fontSize: 15, fontWeight: '600'}}>
            {(uploadType == 'song' ? "Song" : "Production")} Title
          </Text>
          <View style={styles.textInputContainer}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Enter a Title..."
              placeholderTextColor="lightgray"
              onChangeText={setTitle}
              value={title}
            />
          </View>
        </View>

        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity 
            style={[styles.uploadButton, {backgroundColor: (incompleteUpload ? '#9CA3AF' : '#FF9FBC')}]}
            disabled={incompleteUpload}
            onPress={() => handleSaveUpload()}
          >
            <Text style={styles.uploadButtonText}>Upload Work</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default UploadWorkScreen