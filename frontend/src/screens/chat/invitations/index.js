import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import styles from './styles'
import { Feather } from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context'
import CachedImage from 'react-native-expo-cached-image'
import FocusAwareStatusBar from '../../../components/general/lightStatusBar'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import {useUser} from '../../../hooks/useUser'
import InvitePending from '../../../components/chat/invite';
import { createConnection, deleteInvitation, getPendingConnects } from '../../../services/connect';

const InvitationsScreen = ({route}) => {

  const navigation = useNavigation()

  const currentUser = useSelector(state => state.auth.currentUser)

  const [data, setData] = useState([])

  useEffect(() => {
    getPendingConnects(currentUser.uid).then((res) => {
        setData(res)
    })
  }, [])

  const renderItem = ({item}) => {
    return (
        <InvitePending item={item} updateInvitations={updateInvitations}/>
    )
  }

  const updateInvitations = (item, newStatus) => {
    if (newStatus === 'decline') {
        deleteInvitation(currentUser.uid, item)
        setData(data.filter((index) => index.id != item.id))
    }
    else {
        createConnection(currentUser.uid, item?.user)
        setData(data.filter((index) => index.id != item.id))
    }
  }

  return (
    <SafeAreaView style={styles.container}>

        <FocusAwareStatusBar barStyle="light-content"/>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <Feather name="arrow-left" size={30} color="lightgray" />
          </TouchableOpacity>
          <Text style={{fontFamily: 'inter_black', fontSize: 30, color: 'lightgray', paddingLeft: 12}}>Connects</Text>
          <TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
            {data.length > 0 ?
                <FlatList 
                    data={data}
                    renderItem={renderItem}
                    removeClippedSubviews
                    keyExtractor={(item) => item.id}
                    bounces={false}
                />
                :
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>NO PENDING CONNECTS</Text>
                </View>
            }
        </View>

    </SafeAreaView>
  )
}

export default InvitationsScreen