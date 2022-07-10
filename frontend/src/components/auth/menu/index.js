import { View, Text, SafeAreaView , TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './style'
import {Feather} from '@expo/vector-icons'
import FocusAwareStatusBar from '../../../components/general/lightStatusBar'

export default function AuthMenu({authPage, setAuthPage, detailsPage, setDetailsPage}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../../../assets/Swipy_Full_B.png')}/>
      </View>
      <View style={styles.containerMain}>
        <Text style={styles.headerText}>{authPage == 0 ? 'Sign in' : 'Sign up'}</Text>
        <TouchableOpacity style={styles.providerButton} onPress={() => setDetailsPage(true)}>
          <Feather name="user" size={24} color="white"/>
          <Text style={styles.providerButtonText}>Use Email</Text>
          <View />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.containerBottomButton} onPress={() => authPage == 0 ? setAuthPage(1) : setAuthPage(0)}>
        {authPage == 0 ? 
          <Text style={{color: 'lightgray'}}>Don't have an account? <Text style={styles.bottomButtonText}>Sign up</Text></Text>
          :
          <Text style={{color: 'lightgray'}}>Already have an account? <Text style={styles.bottomButtonText}>Sign in</Text></Text>
        }
      </TouchableOpacity>
    </View>
  )
}