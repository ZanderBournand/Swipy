import { View, Text, TouchableOpacity, Image, ActivityIndicator  } from 'react-native'
import React, {useState} from 'react'
import NavBarGeneral from '../../../components/general/navbar'
import {SafeAreaView} from 'react-native-safe-area-context'
import styles from './styles'
import {Feather} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { saveUserProfileImage } from '../../../services/user'
import {useSelector} from 'react-redux'
import {useNavigation} from '@react-navigation/native'

export default function EditProfileScreen() {

  const auth = useSelector(state => state.auth)
  let [loading, setLoading] = useState(false)

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

  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral />
      <View style={styles.imageContainer}> 
        <TouchableOpacity style={styles.imageViewContainer} onPress={() => chooseImage()}>
            <Image style={styles.image} source={{uri: auth.currentUser.photoURL}} onLoadStart={() => {setLoading(true)}} onLoadEnd={() => {setLoading(false)}} /> 
            <View style={styles.imageOverlay}/>
            {loading ?
                <ActivityIndicator size="small" color="white"/>
                :
                <Feather name='camera' size={26} color='white'/>
            }
        </TouchableOpacity>
      </View>
      <View style={styles.fieldsContainer}>
            <TouchableOpacity 
                style={styles.fieldItemContainer}
                onPress={() => navigation.navigate('editProfileField', { title: 'Display Name', field: 'displayName', value: auth.currentUser.displayName })}
            >
                <Text>Display Name</Text>
                <View style={styles.fieldValueContainer}>
                    <Text>{auth.currentUser.displayName}</Text>
                    <Feather name='chevron-right' size={20} color='gray'/>
                </View>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}