import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useState, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import styles from './styles'
import CachedImage from "react-native-expo-cached-image"
import { Feather } from '@expo/vector-icons';
import { getPopularNoSlice } from '../../../services/helpers'
import { clearModal } from '../../../redux/actions/modal';
import { sendConnectRequest } from '../../../services/connect';
import { useConnectedMutation } from '../../../hooks/useConnectedMutation';
import { openPopup2, openPopup3 } from '../../../redux/actions/popup';

const ConnectModal = ({ uploads, user }) => {

  const [data, setData] = useState(null)
  const [itemSelected, setItemSelected] = useState(false)

  const currentUser = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()

  const newConnectedMutation = useConnectedMutation()

  useEffect(() => {
    let popular = getPopularNoSlice(uploads)
    popular.unshift({
      id: 'n/a',
    })
    for (const item of popular) {
      item.checked = false
    }
    setData(popular)
  }, [uploads])

  const checkboxHandler = (index) => {
    const newValue = data.map((item, i) => {
      if (i != index) {
        return {
          ...item,
          checked: false,
        }
      }
      if (i === index) {
        if (!item.checked == true) {
          setItemSelected(true)
        }
        else {
          setItemSelected(false)
        }
        const newItem = {
          ...item,
          checked: !item.checked,
        }
        return newItem
      }
      return item
    })
    setData(newValue)
  }

  const sendInvitation = () => {
    dispatch(clearModal())
    var itemSelected = data.find(item => {
      return item.checked === true
    })
    delete itemSelected.checked
    sendConnectRequest(currentUser?.uid, user, itemSelected).then((res) => {
      if (res === 'sent') {
        setTimeout(() => {
          dispatch(openPopup2(itemSelected))
        }, 200)
      }
      else if (res === 'complete') {
        newConnectedMutation.mutate({userId: currentUser?.uid, otherUserId: user, isConnected: false})
        setTimeout(() => {
          dispatch(openPopup3(itemSelected))
        }, 200)
      }
    })
  }

  const renderItem = ({item, index}) => {

    if (item.id != 'n/a') {
      return (
      <TouchableOpacity style={[styles.itemContainer, {backgroundColor: (item.checked ? '#202020' : null)}]} onPress={() => {checkboxHandler(index)}}> 
          <View style={styles.checkboxContainer}>
            {item.checked == true ?
              <View style={styles.buttonChecked}>
                <Feather name="check" size={25} color="black" />
              </View>
              :
              <View style={styles.buttonUnChecked}>
                <Text></Text>
              </View>
            }
          </View>
          <CachedImage style={styles.itemImage} source={{uri: item?.media.artwork}}/>
          <View style={styles.trackInfo}>
            <Text style={styles.itemTitle}>{item?.title}</Text>
            <Text style={styles.itemType}>{item?.type}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    else {
      return (
        <TouchableOpacity style={[styles.itemContainer, {backgroundColor: (item.checked ? '#202020' : null)}]} onPress={() => {checkboxHandler(index)}}>
          <View style={styles.checkboxContainer}>
            {item.checked == true ?
              <View style={styles.buttonChecked}>
                <Feather name="check" size={25} color="black" />
              </View>
              :
              <View style={styles.buttonUnChecked}>
                <Text></Text>
              </View>
            }
          </View>
          <View style={styles.noDataTextContainer}>
            <Text style={styles.noDataText}>No Preference</Text>
          </View>
        </TouchableOpacity>
      )
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Select Track</Text>
        <TouchableOpacity onPress={() => {dispatch(clearModal())}}>
          <Feather name="x" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <BottomSheetFlatList 
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.buttonContainer}>
        {itemSelected ?
          <TouchableOpacity style={styles.button} onPress={() => {sendInvitation()}}>
            <Text style={styles.buttonText}>CONNECT</Text>
          </TouchableOpacity>
          :
          <View style={styles.buttonOff}>
            <Text style={styles.buttonOffText}>CONNECT</Text>
          </View>
          }
      </View>
    </View>
  )
}

export default ConnectModal