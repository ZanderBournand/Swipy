import { View, Text, Dimensions } from 'react-native'
import React, {useEffect, useRef, useState, useMemo} from 'react'
import BottomSheet, {useBottomSheetDynamicSnapPoints,} from '@gorhom/bottom-sheet'
import { useSelector, useDispatch } from 'react-redux'

const FeedModal = () => {

  const modalState = useSelector(state => state.feedModal)
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

  }

  const renderContent = () => {
    switch(modalState.modalType) {
      case 1:
        return 
      case 2: 
        return 
      case 3: 
        return
      default:
        return (<></>)
    }
  }

  const BottomSheetBackground = ({style}) => {
    return (
      <View
        style={[
          {
            backgroundColor: '#121212',
            borderRadius: 0,
          },
          {...style},
        ]}
      />
    );
  };
  

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={['99.99999999%']} index={-1} enablePanDownToClose onClose={onClose} keyboardBehavior={"extend"}handleComponent={() => <></>} containerHeight={Dimensions.get('window').height} backgroundComponent={props => <BottomSheetBackground {...props} />}>
      {renderContent()}
    </BottomSheet>
  )
}

export default FeedModal