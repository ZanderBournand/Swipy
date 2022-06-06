import { View, Text, Image, TouchableOpacity, FlatList, Dimensions} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Feather} from '@expo/vector-icons'
import styles from './styles'
import { useFonts, Inter_900Black, Inter_500Medium, Inter_700Bold, Inter_300Light, Inter_100Thin, Inter_200ExtraLight} from '@expo-google-fonts/inter';
import {useSelector} from "react-redux"
import CachedImage from 'react-native-expo-cached-image'
import {useNavigation} from "@react-navigation/native"
import BestWorkItem from '../../../components/upload/bestwork'

const UploadScreen = () => {

  const windowHeight = Dimensions.get('window').height;

  const currentUser = useSelector(state => state.auth.currentUser)
  const navigation = useNavigation()

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_700Bold,
    Inter_300Light,
    Inter_100Thin,
    Inter_200ExtraLight
  });
    
  if (!fontsLoaded) {
    return <></>;
  }

  const mockData = [
    {
      title: 'Hands To Myself',
      date: 'Oct 15, 2021',
      length: '3:05',
      artwork: 'https://images.complex.com/complex/images/c_fill,f_auto,g_center,w_1200/fl_lossy,pg_1/hcjrqlvc6dfhpjxob9nt/cudi',
      views: '220',
      interactions: '11',
    },
    {
      title: 'At My Worst (Feat. Kehlani)',
      date: 'Oct 10, 2021',
      length: '4:12',
      artwork: 'https://blog.spoongraphics.co.uk/wp-content/uploads/2017/01/thumbnail-2.jpg',
      views: '156',
      interactions: '6',
    },
    {
        title: 'N95',
        date: 'Oct 17, 2021',
        length: '3:34',
        artwork: 'https://media.pitchfork.com/photos/627c1023d3c744a67a846260/master/pass/Kendrick-Lamar-Mr-Morale-And-The-Big-Steppers.jpg',
        views: '78',
        interactions: '3',
    }
  ]

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => {navigation.navigate("workUpload")}}>
                    <Feather name="arrow-up" size={30} color="black" />
                </TouchableOpacity>
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
                <View style={{paddingLeft: 20, paddingTop: 20, paddingBottom: 20}}>
                    <TouchableOpacity style={styles.uploadButton} onPress={() => {navigation.navigate("workUpload")}}>
                        <Feather name="upload-cloud" size={28} color="white" />
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Upload</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.right}>
                <Image source={require('../../../../assets/Swipy_Left_P.png')}/>
            </View>
        </View>
        <View style={styles.subContainer}>
            <Text style={{fontFamily: 'Inter_700Bold', fontSize: 22}}>Your Trending Sounds</Text>
        </View>
        <View>
            <FlatList
                data={(windowHeight > 840 ? mockData.slice(0, 3) : mockData.slice(0, 2))}
                renderItem={({item}) => (<BestWorkItem item={item}/>)}
                keyExtractor={(item) => item.title}
                scrollEnabled={true}
            />
        </View>
        <View style={styles.tracks}>
            <View style={styles.trackCount}>
                <Text style={{fontFamily: 'Inter_700Bold', fontSize: 22}}>
                    My Tracks 
                    <Text style={{fontFamily: 'Inter_200ExtraLight'}}> (</Text>
                    <Text style={{fontFamily: 'Inter_700Bold'}}>35</Text>
                    <Text style={{fontFamily: 'Inter_200ExtraLight'}}>)</Text>
                </Text>
            </View>
            <View>
                <TouchableOpacity style={styles.allTracksButton}>
                    <Text style={{fontWeight: '600', fontSize: 15}}>See All</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default UploadScreen