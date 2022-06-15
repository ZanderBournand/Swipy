import { View, Text } from 'react-native'
import React from 'react'

import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useRef, useState, forwardRef, useImperativeHandle, useEffect} from 'react'
import styles from './styles'
import { useIsFocused } from '@react-navigation/core'
import { useUser } from '../../hooks/useUser'
import { Audio } from 'expo-av';
import PostSingleOverlay from '../post/overlay'

const PostNoVideo = () => {
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default PostNoVideo