import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Feather} from '@expo/vector-icons'
import styles from './styles'
import { useFonts, Inter_900Black, Inter_500Medium, Inter_700Bold, } from '@expo-google-fonts/inter';
import {useSelector} from "react-redux"
import CachedImage from 'react-native-expo-cached-image'
import {useNavigation} from "@react-navigation/native"

const UploadScreen = () => {

  const currentUser = useSelector(state => state.auth.currentUser)
  const navigation = useNavigation()

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_700Bold,
  });
    
  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
          <View style={styles.titleContainer}>
            <Feather name="arrow-up" size={30} color="black" />
            <Text style={[styles.title, {fontFamily: 'Inter_900Black', fontSize: 30}]}>Upload</Text>
          </View>
          <TouchableOpacity style={styles.profileContainer} onPress={() => {navigation.navigate("Me")}}>
            <CachedImage style={styles.profileImage} source={{uri: currentUser?.photoURL}} />
          </TouchableOpacity>
      </View>
      <View style={styles.uploadContainer}>
        <View style={styles.left}>
            <Text style={{fontFamily: 'Inter_700Bold', fontSize: 18, paddingLeft: 20, paddingTop: 10}}>New Song / Beat</Text>
            <Text style={{fontFamily: 'Inter_500Medium', paddingLeft: 20, paddingTop: 10}}>Upload your work and start collaborating with others!</Text>
            <View style={{paddingLeft: 20, paddingTop: 10, paddingBottom: 20}}>
                <TouchableOpacity style={styles.uploadButton}>
                    <Feather name="upload-cloud" size={24} color="white" />
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Upload</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.right}>
            <Image source={require('../../../assets/Swipy_Left_P.png')}/>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default UploadScreen