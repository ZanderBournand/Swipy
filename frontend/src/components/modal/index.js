import { View, Text } from 'react-native'
import React, {useEffect, useRef} from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { useSelector, useDispatch } from 'react-redux'
import { clearModal } from '../../redux/actions/modal'
import CommentModal from './comment'

const Modal = () => {
  
  const modalState = useSelector(state => state.modal)
  const dispatch = useDispatch();

  const bottomSheetRef = useRef(null)

  useEffect(() => {
    if(modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand()
    }
  }, [modalState])

  const onClose = () => {
    dispatch(clearModal())
  }

  const renderContent = () => {
    switch(modalState.modalType) {
      case 0:
        return (<CommentModal post={modalState.data}/>)
      default:
        return (<></>)
    }
  }
  
  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={["50%"]} index={-1} handleHeight={40} enablePanDownToClose onClose={onClose}>
      {renderContent()}
    </BottomSheet>
  )
}

export default Modal;