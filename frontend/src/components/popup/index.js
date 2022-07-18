import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import styles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { Animated } from 'react-native'
import SendConfirmation from './sendConfirmation'
import SendError from './sendError'
import NewConnect from './NewConnect'

const PopUp = () => {

  const [showModal, setShowModal] = useState(null)
  const scaleValue = useRef(new Animated.Value(0)).current

  const popupState = useSelector(state => state.popup)
  const dispatch = useDispatch();

  useEffect(() => {
    if (popupState?.open) {
      setShowModal(true)
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start()
    }
    else if (!popupState?.open) {
      setTimeout(() => {setShowModal(false)}, 200)
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }).start()
    }
  }, [popupState])

  const renderContent = () => {
    switch(popupState.popupType) {
      case 1:
        return (<SendConfirmation track={popupState?.data}/>)
      case 2:
        return (<SendError track={popupState?.data}/>)
      case 3:
        return (<NewConnect track={popupState?.data}/>)
      default: 
        return (<></>)
    }
  }

  return (
    <Modal transparent visible={showModal}>
        <View style={styles.container}>
            <Animated.View style={[styles.modalContainer, {transform:[{scale: scaleValue}]}]}>
                {renderContent()}
            </Animated.View>
        </View>
    </Modal>
  )
}

export default PopUp