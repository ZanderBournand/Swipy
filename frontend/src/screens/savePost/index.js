import { View, Text, TextInput, Image,TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './styles'
import {useNavigation, StackActions} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'
import {useDispatch} from 'react-redux'
import {createPost} from '../../redux/actions'
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function SavePostScreen(props) {

  const navigation = useNavigation()
  const [description, setDescription] = useState('')

  const [requestRunning, setRequestRunning] = useState(false)

  const [image, setImage] = useState(null);

  const dispatch = useDispatch()
  
  const handleSavePost = () => {
    setRequestRunning(true)
    dispatch(createPost(description, props.route.params.source, props.route.params.sourceThumb))
        .then(() => {
            navigation.dispatch(StackActions.popToTop())
        })
        .catch(() => setRequestRunning(false))
  }

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        props.route.params.source,
        {
          time: 0,
        }
      );
      setImage(uri);
    } catch (e) {
      console.warn(e);
    }
  };
  
  useEffect(() => {
    generateThumbnail()
  }, [])

  if(requestRunning){
      return (
        <View style={styles.uploadingContainer}>
            <ActivityIndicator color='red' size='large'/>
        </View> 
      )
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
          <TextInput
            style={styles.inputText}
            maxLength={150}
            multiline
            onChangeText={(text) => setDescription(text)}
            placeholder="Describe your video..."
          />
          {image == null ? 
            <Image
                style={styles.mediaPreview}
                source={{ uri: props.route.params.source }}
            />
            :
            <Image
                style={styles.mediaPreview}
                source={{ uri: image }}
            />
          }
      </View>

      <View style={styles.spacer}/>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Feather name='x' size={24} color='black'/>
            <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton} onPress={() => handleSavePost()}>
            <Feather name='corner-left-up' size={24} color='white'/>
            <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}