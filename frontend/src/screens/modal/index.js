import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import {Feather} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import {saveUserField, saveUserProfileImage} from '../../services/user'
import {useNavigation} from '@react-navigation/native'

const ModalScreen = () => {

  const auth = useSelector(state => state.auth)
  let [loading, setLoading] = useState(false)

  const [textInputValue, setTextInputValue] = useState('')

  const incompleteForm = !textInputValue || auth.currentUser?.photoURL == null

  const navigation = useNavigation()

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspectRatio: [1, 1],
        quality: 1,
    })
    if(!result.cancelled) {
      setLoading(true)
      saveUserProfileImage(result.uri)
    }
  }

  const onSave = () => {
    saveUserField("displayName", textInputValue)
    .then(() => navigation.goBack())
  }  

  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode="contain" source={require("../../../assets/swipy-pink-pink.png")}/>
      <Text style={styles.textWelcome}>Welcome to Swipy</Text>
      <Text style={styles.step}>Step 1: The Profile Pic</Text>
      <TouchableOpacity style={styles.imageViewContainer} onPress={() => chooseImage()}>
          <Image 
            style={styles.imagePicker}
            source={{ uri: auth.currentUser?.photoURL }}
            onLoadStart={() => {setLoading(true)}}
            onLoadEnd={() => {setLoading(false)}}
          />
          <View style={styles.imageOverlay}>
            {loading ?
                <ActivityIndicator size="small" color="white"/>
                :
                <Feather name='camera' size={26} color='white'/>
            }
          </View>
      </TouchableOpacity>
      <Text style={styles.step}>Step 2: Your Display Name</Text>
      <TextInput
        style={styles.input} 
        placeholder="Enter a Display Name"
        onChangeText={setTextInputValue}
        value={textInputValue}
      />
      <TouchableOpacity 
        style={[styles.updateContainer, {backgroundColor: incompleteForm ? '#9CA3AF' : '#BB43FF'}]} 
        onPress={() => onSave()}
        disabled={incompleteForm}
      >
          <Text style={styles.updateText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ModalScreen