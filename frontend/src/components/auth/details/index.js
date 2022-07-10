import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import {Feather} from '@expo/vector-icons'
import styles from './style'
import { useDispatch } from 'react-redux'
import { login, register } from '../../../redux/actions'

export default function AuthDetails({authPage, setDetailsPage}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [invalidCredentials, setInvalidCredentials] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(false)
  }, [])
  
  const handleLogin = () => {
    setIsLoading(true)
    setInvalidCredentials(false)
    dispatch(login(email, password))
      .then(() => {
        console.log('login successful - ' + email)
      })
      .catch(() => {
        console.log('login failed')
        setIsLoading(false)
        setInvalidCredentials(true)
      })
  }

  const handleRegister = () => {
    setIsLoading(true)
    setInvalidCredentials(false)
    dispatch(register(email, password))
      .then(() => {
        console.log('register successful - ' + email)
      })
      .catch(() => {
        console.log('register failed')
        setIsLoading(false)
        setInvalidCredentials(true)
      })
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity>
            <Feather name="arrow-left" size={24} color="white" onPress={() => setDetailsPage(false)}/>
        </TouchableOpacity>
      <TextInput onChangeText={(text) => setEmail(text)} style={styles.textInput} placeholder="Email" placeholderTextColor='lightgray'/>
      <TextInput onChangeText={(text) => setPassword(text)} style={styles.textInput} secureTextEntry placeholder="Password" placeholderTextColor='lightgray'/>
      {invalidCredentials ?
        <Text style={styles.invalidCredentials}>Invalid Credentials! Please try again</Text>
        :
        <Text style={styles.invalidCredentials}></Text>
      }
      <TouchableOpacity style={styles.button} onPress={() => authPage == 0 ? handleLogin() : handleRegister()}>
          <Text style={styles.buttonText}>{authPage == 0 ? 'Sign In' : 'Sign Up'}</Text>
      </TouchableOpacity>
      {isLoading ? 
        <ActivityIndicator size="large" color="#fd7aa3" style={styles.loadingIndicator} />
        :
        <></>
      }
    </View>
  )
}