import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import styles from './styles'
import { Animated } from 'react-native'

const ConfirmationModal = ({visible, children}) => {

  const [showModal, setShowModal] = useState(visible)
  const scaleValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        toggleModal()
    }, [visible])

  const toggleModal = () => {
    if (visible) {
        setShowModal(true)
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }).start()
    }
    else {
      setTimeout(() => {setShowModal(false)}, 200)
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }).start()
    }
  }

  return (
    <Modal transparent visible={showModal}>
        <View style={styles.container}>
            <Animated.View style={[styles.modalContainer, {transform:[{scale: scaleValue}]}]}>
                {children}
            </Animated.View>
        </View>
    </Modal>
  )
}

export default ConfirmationModal