import { View, Text } from 'react-native'
import React, {useEffect, useRef} from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { useSelector, useDispatch } from 'react-redux'
import { clearModal } from '../../redux/actions/modal'
import CommentModal from './comment'
import ConnectModal from './connect'

const Modal = () => {
  
  const modalState = useSelector(state => state.modal)
  const dispatch = useDispatch();

  const bottomSheetRef = useRef(null)

  useEffect(() => {
    if(modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand()
    }
    else if (!modalState.open) {
      bottomSheetRef.current.close()
    }
  }, [modalState])

  const onClose = () => {
    if (modalState.open) {
      dispatch(clearModal())
    }
  }

  const renderContent = () => {
    switch(modalState.modalType) {
      case 0:
        return (<CommentModal post={modalState.data}/>)
      case 1: 
        return (<ConnectModal uploads={modalState.data.uploads} user={modalState.data.user}/>)
      default:
        return (<></>)
    }
  }
  
  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={["45%"]} index={-1} handleHeight={40} enablePanDownToClose onClose={onClose} keyboardBehavior={"extend"} backgroundStyle={{backgroundColor: '#252525'}}>
      {renderContent()}
    </BottomSheet>
  )
}

export default Modal;