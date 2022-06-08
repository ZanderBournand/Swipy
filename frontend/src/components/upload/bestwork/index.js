import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import CachedImage from 'react-native-expo-cached-image'
import { useFonts, Inter_900Black, Inter_500Medium, Inter_700Bold} from '@expo-google-fonts/inter';
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const BestWorkItem = ({ item }) => {

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_700Bold,
  });
    
  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1, backgroundColor: 'row'}}>
        <CachedImage source={{uri: item.artwork}} style={styles.artwork}/>
      </View>
      <View style={styles.description}>
        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{fontFamily: 'Inter_500Medium', fontSize: 18, flex: 1}}>{item.title}</Text>
        <Text style={{paddingBottom: 15, fontSize: 16, flex: 0.7}}>{item.date}</Text>
        <View style={styles.stats}>
          <View style={styles.statsItem}>
            <Feather name="clock" size={24} color="gray" />
            <Text style={styles.statsText}>{item.length}</Text>
          </View>
          <View style={styles.statsItem}>
            <Feather name="play-circle" size={24} color="gray" />
            <Text style={styles.statsText}>{item.views}</Text>
          </View>
          <View style={styles.statsItem}>
            <MaterialCommunityIcons name="handshake-outline" size={24} color="gray" />
            <Text style={styles.statsText}>{item.interactions}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default BestWorkItem