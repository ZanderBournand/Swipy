import { View, Text, Dimensions } from 'react-native'
import React, {useEffect, useRef, useState, useMemo} from 'react'
import BottomSheet, {useBottomSheetDynamicSnapPoints,} from '@gorhom/bottom-sheet'
import { useSelector, useDispatch } from 'react-redux'
import Player from './player'
import useMaterialNavBarHeight from '../../hooks/useMaterialNavBarHeight'
import { clearPlayerModal } from '../../redux/actions/playerModal'

const PlayerModal = () => {

  const modalState = useSelector(state => state.playerModal)
  const bottomSheetRef = useRef(null)

  const dispatch = useDispatch()

  const height = useMaterialNavBarHeight(false)

  useEffect(() => { 
    if(modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand()
    }
    else if (!modalState.open) {
      bottomSheetRef.current.close()
    }
  }, [modalState])

  const onClose = () => {
    dispatch(clearPlayerModal())
  }  

  const BottomSheetBackground = ({style}) => {
    return (
      <View
        style={[
          {
            backgroundColor: '#030303',
            borderRadius: 5,
          },
          {...style},
        ]}
      />
    );
  };

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={['8%']} index={-1} enablePanDownToClose onClose={onClose} keyboardBehavior={"extend"}handleComponent={() => <></>} backgroundComponent={props => <BottomSheetBackground {...props} />} bottomInset={height}>
      <Player />
      <View style={{height: 1.5, backgroundColor: '#303030'}}>
        <></>
      </View>
    </BottomSheet>
  )
}

export default PlayerModal